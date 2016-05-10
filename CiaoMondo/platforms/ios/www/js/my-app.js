// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});


function getPosts(){
	var html = "";
	$$.ajax({
		url: "http://Valeria.local:8888/wordpress/wp-json/posts",
		dataType: "json",
		method: "get",
		success: function(data) {
			for (i = 0; i < data.length; i++) {
                html += "<div class='card'><div style='background-image:url(http://Valeria.local:8888/wordpress/wp-content/uploads/"+data[i].featured_image.attachment_meta.file+")' valign='bottom' class='card-header color-white no-border'></div><div class='card-content'><div class='card-content-inner'><p class='color-gray'>Posted on January 21, 2015</p><h1 class='post-title'>"+data[i].title+"</h1><div class='text-grey'>"+data[i].excerpt+"</div></div></div><div class='card-footer'><a href='#' class='link'>Like</a><a href='post.html' class='link' data-id='"+ data[i].ID+"' onclick='fillPostPage(event)'>Read more</a></div></div><div class='break-40'></div>";
			};
			$$(".posts").html(html);
		}
	});
}

function fillPostPage(evt){
	var html = "";
	$$.ajax({
		url: "http://Valeria.local:8888/wordpress/wp-json/posts/"+evt.target.dataset.id,
		dataType: "json",
		method: "get",
		success: function(data) {
			console.log(data);
			html += "<div class='foto' style='background-image:url(http://Valeria.local:8888/wordpress/wp-content/uploads/"+data.featured_image.attachment_meta.file+"'></div>";
			console.log(html);
			console.log($$("[data-page='post'] .page-content .info-adozione"));
			$$("[data-page='post'] .page-content .info-adozione").html("<div class='foto' style='background-image:url(http://valeria.local:8888/wordpress/wp-content/uploads/"+data.featured_image.attachment_meta.file+")'></div>");
		},
		error: function(error){
			alert(error);
		}
	});
}

getPosts();

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}