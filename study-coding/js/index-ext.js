$("title").text(WEB_TITLE);
$.ajax({
            url : MD_URL,
            dataType: "text",
            success : function (data) {
                let md_content=marked(data);
                md_content=md_content.replaceAll('src', 'data-original');
				$("#md_content").append(md_content);
                if(IMG_WH.length>0){
                    let i=0;
                    $( "img" ).each(function() {
                        $( this ).attr("width",IMG_WH[i][0]).attr("height",IMG_WH[i][1]);
                        i++;
                    });
                    $("img").addClass("lazy img-fluid d-block m-2 mx-auto").lazyload();
                }
                $("#md_content h1").addClass("text-info mb-0 p-2 text-center");
                $("#md_content h3").addClass("text-warning mb-0 p-2");
                $("#md_content h3 a").addClass("btn btn-primary");
                $("#md_content p,#md_content ol li,#md_content ol li").addClass("text-info p-3");
                $("blockquote p").removeClass("text-info").addClass("bg-dark text-white-50 mx-3 rounded");
            }
});