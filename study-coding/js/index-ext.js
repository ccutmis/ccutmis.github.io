$("title").text(WEB_TITLE);
$.ajax({
            url : MD_URL,
            dataType: "text",
            success : function (data) {
				$("#md_content").html(marked(data));
                $("img").addClass("lazy img-fluid d-block m-2 mx-auto").lazyload();
                $("#md_content h1").addClass("text-info mb-0 p-2 text-center");
                $("#md_content h3").addClass("text-warning mb-0 p-2");
                $("#md_content h3 a").addClass("btn btn-primary");
                $("#md_content p,#md_content ol li,#md_content ol li").addClass("text-info p-3");
                $("blockquote p").removeClass("text-info").addClass("bg-dark text-white-50 mx-3 rounded");
            }
});