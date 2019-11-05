let getProfile = (a)=>{
    let title = a.innerText
    if(title.includes('作者')){
        return a.nextElementSibling.innerText.trim()
    } 
	else if('出品方:,译者,丛书:'.includes(title.trim())){
		return a.nextElementSibling.innerText.trim()
    }else{
		return a.nextSibling.textContent.trim()
    }
}

let getDate = (a)=>{
    if(!a){
        return '1900-01-01';
    }
    let dt = a.split('-')
    if(dt.length === 1){
        return a += '-01-01'
    }else if(dt.length === 2){
        var month = dt[1].length === 1 ? ("0" + dt[1]) : dt[1]
        return dt[0] + '-' + month + '-' + '01'
    }else{
        var month = dt[1].length === 1 ? ("0" + dt[1]) : dt[1]
        var day = dt[2].length === 1 ? ("0" + dt[2]) : dt[2]
        return dt[0] + "-" + month + "-" + day 
    }
}

chrome.extension.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action === "copy") {

            let profile = $("#info  span.pl").toArray().map(a => {
                let obj = {};
                let key = a.innerText.endsWith(':') ? a.innerText.slice(0, -1) : a.innerText
                obj[key] = getProfile(a)
                return obj
            }).reduce((a,c)=>{let key = Object.keys(c)[0];a[key]=c[key];return a},{})

            let data = {}
            data.book_title = $('#wrapper').find('h1 span').text();
            data.book_author = profile['作者']
            data.book_press = profile['出版社']
            data.book_date = profile['出版年']
            data.book_serial = profile['丛书']
            data.book_serialid = profile['ISBN']
            data.book_picture = $('#mainpic img')[0].src
            let intro = $('.all.hidden .intro')
            if(intro.length === 0){
                intro = $($('.indent .intro')[0])
            }
            data.book_intro = intro.children().toArray().map(a=>a.innerText).join(`
            `)
            data.book_tags = $('#db-tags-section .indent').children().toArray().map(a=>a.querySelector('a.tag').innerText).join(',')

            if (data) {
                if (sendResponse) sendResponse(data);
            } else {
                alert("No data");
            }
        } else if (request.action === "paste") {
            $("#book_title").val(request.data.book_title)
            $("#bookAuthor").val(request.data.book_author)
            $('#description_ifr')[0].contentWindow.document.querySelector('#tinymce p').innerText = request.data.book_intro
            $('#tags').val(request.data.book_tags)
            $('#series').val(request.data.book_serial)
            $('#series_index').val(request.data.book_serialid)
            $('.rating-input.input-lg').children().toArray().map(a=>{
                if(a.getAttribute('data-value')<5){ 
                    a.classList.remove('glyphicon-star-empty'); 
                    a.classList.add('glyphicon-star')
                }
            })
            $('#cover_url').val(request.data.book_picture)
            $('#pubdate').val(getDate(request.data.book_date))
            $('#publisher').val(request.data.book_press)
        }
    }
);



       