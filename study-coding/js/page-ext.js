$.ajax({
    url : MD_URL,
    dataType: "text",
    success : function (data) {
        let md_content=marked.parse(data);
        md_content=md_content.replaceAll('src', 'data-original');
        $("#md_content").append(md_content);
        if(LAST_URL!=''){$("#md_content").append("<div class='pb-5 text-center'><button type='button' class='btn btn-secondary' onclick='window.scrollTo(0,0);'>回到上方</button> <button type='button' class='btn btn-primary' onclick='window.location.href=\""+LAST_URL+"\";'>回上一層</button></div>");}
        $("img").addClass("lazy img-fluid d-block m-2 mx-auto").lazyload();
        $("#md_content h1").addClass("text-info mb-0 p-2 text-center");
        if(LAST_URL!=''){$("#md_content h1").append("<button type='button' class='btn btn-primary' onclick='window.location.href=\""+LAST_URL+"\";'>回上一層</button>");}
        $("#md_content h2").addClass("text-warning mb-0 p-2");
        $("#md_content h3").addClass("text-warning mb-0 p-2");
        $("#md_content a").addClass("text-reset btn btn-secondary");
        $("#md_content table").addClass("w-75 mx-auto text-white-50");
        $("#md_content table tr td").addClass("p-2 border text-info");
        $("#md_content p,#md_content ol li,#md_content ol li").addClass("text-info p-3");
        $("blockquote p").removeClass("text-info").addClass("bg-dark text-white-50 mx-3 rounded");
        $("pre").addClass("bg-dark p-2 rounded");
        $("pre code").addClass("bg-dark text-white-50");
    }
});