(function (window, $, fx) {
    // insert backend logic here
    window.partnerListingCheck = (function ()
    {
            var checkExhibitors = function ($partner) {
                var $target = $partner.find(".exhibitors-lists-type");

                var $sources = $(".ParticipatingHide, .RawSpaceHide", $partner);
                var totalSources = $sources.length;
                var totalEmpty = 0;

                $sources.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmpty += 1;
                    }
                });

                if (totalEmpty == totalSources) {
                    $target.hide();
                }

                var $tagretParticipating = $partner.find(".litParticipatingID");
                var $sourcesParticipating = $(".ParticipatingHide", $partner);
                var totalParticipating = $sourcesParticipating.length;
                var totalEmptyPartner = 0;

                var $tagretRaw = $partner.find(".litRawID");
                var $sourcesRaw = $(".RawSpaceHide", $partner);
                var totalRaw = $sourcesRaw.length;
                var totalEmptyRaw = 0;

                $sourcesParticipating.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmptyPartner += 1;
                    }
                });

                if (totalEmptyPartner == totalParticipating) {
                    $tagretParticipating.hide();
                }

                $sourcesRaw.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmptyRaw += 1;
                    }
                });

                if (totalEmptyRaw == totalRaw) {
                    $tagretRaw.hide();
                }
               
            };

            var checkPartners = function ($partner) {
                var $target = $partner.find(".partners-lists-lists-type");

                var $sources = $('.MediaHide, .SupportingHide', $partner);
                var totalSources = $sources.length;
                var totalEmpty = 0;

                $sources.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmpty += 1;
                    }

                });

                if (totalEmpty == totalSources) {
                    $target.hide();
                }

                var $targetSupporting = $partner.find(".Supporting");
                var $sourcesSupporting = $('.SupportingHide', $partner);
                var totalSupporting = $sourcesSupporting.length;
                var totalEmptySupporting = 0;

                $sourcesSupporting.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmptySupporting += 1;
                    }

                });

                if (totalEmptySupporting == totalSupporting) {
                    $targetSupporting.hide();
                }

                var $targetMedia = $partner.find(".Media");
                var $sourcesMedia = $('.MediaHide', $partner);
                var totalMedia = $sourcesMedia.length;
                var totalEmptyMedia = 0;

                $sourcesMedia.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmptyMedia += 1;
                    }

                });

                if (totalEmptyMedia == totalMedia) {
                    $targetMedia.hide();
                }


            };

            var checkSponsors = function ($partner) {
                var $target = $partner.find(".sponsor-lists-type");
                var $sources = $partner.find('.sponsorHide');
                var totalSources = $sources.length;
                var totalEmpty = 0;

                $sources.each(function () {
                    if ($.trim($(this).text()) == '') {
                        totalEmpty += 1;
                    }
                });

                if (totalEmpty == totalSources) {
                    $target.hide();
                }
            };

            var removeSpace = function ($partner) {
                var partnerId = $partner.attr("id");
                var $tabNavs = $partner.find('ul.nav');
                var $tabContents = $partner.find(".tab-content .tab-pane");

                $tabNavs.each(function (i) {
                   var i = 0;
                    var $lists = $(this).find("li");

                    $lists.each(function (i) {
                        var $a = $(this).find('a');         
                        var href = $a.attr("href");
                        var $li = $(this);

                        if ($.trim($a.text()) == '') {
                          $(this).remove();
                        } else {
                          $a.attr("data-target", "#" + partnerId + " " + href);
                          $a.attr('href', 'javascript:void(0)');
                          $tabContents.eq(i).attr("id", href.replace(/^\s*#/, ""));

                          i += 1;
                         }

                    });

                    $lists.filter(":visible").first().find("a").tab("show");
                });

            };

            var check = function () {
                $('.partner').each(function (i) {
                    var $partner = $(this);
                    var id = "partner-" + parseInt((new Date()).toString().replace(/[^0-9]/g, '')).toString(16) + i;

                    $partner.attr("id", id);
                    // checkExhibitors($partner);
                    // checkPartners($partner);
                    // checkSponsors($partner);
                    removeSpace($partner);
                });
            };

            return check;

    }());

    //for widget partner
    partnerListingCheck();

    //$(document).ready(function () {

    //partnerListingCheck();

    //}); //end document ready

    if ($(".sfPageEditor").length > 0) {

        if (window.Telerik) {

            Telerik.Sitefinity.Web.UI.ZoneEditor.prototype._onEditWindowClose = function (sender, args) {

                sender.remove_close(this._windowClosedDelegate);
                var value = args.get_argument();
                var handled = this.get_lockingHandler().tryHandleError(value);
                if (handled == false) {
                    this.execCommand(value, this._currentEditedDock);
                }
                this._currentEditedDock = null;

                setTimeout(function () {
                    partnerListingCheck();
                }, 500);

            };

        }

    }



    var $gloader = $("<div class='preloader'><img src='/assets/images/techinnovation.gif'/></div>");
    var isTriggered = false;
    var $quryear;
    var qs = FXM.parseQueryString();

    $gloader.prependTo('#listingGallery');
    $gloader.addClass('hidden');

    var filterList = {
        init: function (filterYearActive) {
            filterYearActive = FXM.ifUndefined(filterYearActive, '.all');

            // MixItUp plugin
            // http://mixitup.io
            if ($('#portfoliolist').length > 0) {

                try {
                    $('#portfoliolist').mixItUp('destroy');
                }
                catch (e) {

                }

                var mixer = $('#portfoliolist').mixItUp({
                    selectors: {
                        target: '.portfolio',
                        filter: '.filter'
                    },
                    load: {
                        filter: filterYearActive
                    }

                });

                if (filterYearActive == '.all') {
                    isTriggered = true;
                    $('.js-first-filter').trigger('click');
                }
            }

        }

    };

    //init icon play video
    $root2 = $('#portfoliolist');
    var $youtubePlayIcon2 = $('<div class="play-btn"></div>');

    var getYouTubeID2 = function (url2) {
        var ret2 = '';
        var trimmedUrl2 = $.trim(url2);

        // the thing inside round bracket is youtube id
        var PATTERN2 = [
            /^https?:\/\/youtu\.be\/([a-zA-Z0-9_\-]{11})[^\s]{0,}$/,
            /^https?:\/\/www.youtube\.com\/watch\?v=([a-zA-Z0-9_\-]{11})[^\s]{0,}$/,
            /^https?:\/\/www.youtube\.com\/embed\/([a-zA-Z0-9_\-]{11})[^\s]{0,}$/
        ];

        $.each(PATTERN2, function (k2, vid2) {
            if (vid2.test(trimmedUrl2)) {
                ret2 = trimmedUrl2.replace(vid2, '$1');
                return false;
            }
        });

        return ret2;
    };

    //init checkVideoThumbnails
    var checkVideoThumbnails = function () {
        $root2.find('.portfolio-wrapper').each(function () {
            var $this = $(this);
            var $ytPlayIcon = $youtubePlayIcon2.clone();
            var videoUrl = getYouTubeID2(FXM.ifUndefined($this.attr('data-video'), ''));

            if (videoUrl != '' && $this.find('.play-btn').length == 0) {
                $this.append($ytPlayIcon);
            }
        });
    };


    // Disable animation in the backend
    if ($(".sfPageEditor").length > 0) { //In backend mode
        $animatedEl = $(".animated");

        // Remove Animation
        if ($animatedEl.length > 0) {
            $animatedEl.each(function () {
                $(this).removeClass("fadeIn fadeInLeft fadeInRight fadeInUpShort fadeInRightShort fadeInLeftShort fadeInDownShort growIn go fadeInUp fadeInDown ");
            });
        }
    }


    /*
     * automatically scroll to the first error encountered
     * after postback
     * search for the .field-validation-error active class
     * 
     * @example add the errorScroll.init() on document ready or window load
    */
    var errorScroll = (function (window, $) {

        var $err, formHeight, menuHeight, offset, $html, $collapse,
            isError = false,
            margin = 30;

        var _init = function () {
            $html = $('html,body');
            $err = $('.field-validation-error').filter('.active');
            $collapse = $err.parents(".form-collapse-data");
            menuHeight = $('header').height();

            _check();
        }

        var _check = function () {
            if ($err.length > 0) {
                isError = true;
                formHeight = $err.eq(0).parent().offset().top;
                offset = formHeight - menuHeight - 30;
                _animate();
            } else {
                return "";
            }
        }

        var _animate = function () {
            $html.animate({
                scrollTop: offset
            }, 1000);
        }

        return {
            init: _init
        }

    }(window, jQuery));

    var $this = $('.container .clearfix'),
             year = qs.year;
    var $filter = $('#filters .filter');

    var thisLi = $('.filter');
    var results = [];

    var targetLi = $("#filters");
    var $curyear = -1;
    var $curUrl;
    var $curUrl2;
    var $id;
    var $thisSpan;

    //Get API Listing Gallery

    errorScroll.init();
    if ($(".js-filters").length > 0) {

        if (year) {
            $gloader.removeClass('hidden');


            $.get("/WebService/Gallery/Gallery.svc/GetPhotoAlbums/?year=" + year, function (data) {
                var retrievedObjectImage;
                var retrievedObject;
                var dataSelect;
                var dataSelectImage;

                if (data) {


                    for (var i = 0; i < data.length; i++) {
                        var dataYear = data[i].Year;
                        results = " " + "." + dataYear;
                        var x = [x, results];
                    }

                    var targetAll = "<li><span class='filter js-first-filter' data-filter='" + x + "'>" + "All" + "</span></li>";
                    targetLi.append(targetAll);

                    for (var i = 0; i < data.length; i++) {
                        var dataYear = data[i].Year;

                        targetLi.append("<li><span class='filter' data-filter='." + dataYear + "'>" + dataYear + "</span></li>");
                    }

                    var allYear = $("ul.clearfix li:first").find('span').attr("data-filter");
                    var $trimComma = allYear.split(',').slice(1);
                    $("ul.clearfix li:first").find('span').attr("data-filter", $trimComma);

                    var targetList = $("#portfoliolist");
                    $.get("/WebService/Gallery/Gallery.svc/GetPhotoGalleries/?year=" + year, function (data) {

                        if (data) {
                            targetList.html("");

                            for (var i = 0; i < data.length; i++) {
                                var dataTitle = data[i].Title;
                                var dataImage = data[i].Image;
                                var dataYear = data[i].Year;
                                var dataVideo = data[i].UrlYoutube;

                                if (dataVideo != '') {
                                    targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                     " <div class='portfolio-wrapper' data-image='' data-video ='" + dataVideo + "'> " +
                                                     "     <img src=' " + dataImage + "?size=400' /> " +
                                                     "     <div class='label'> " +
                                                     "         <div class='label-text'>" +
                                                     "             <a class='text-title'> " + dataTitle + "</a> " +
                                                     "         </div> " +
                                                     "         <div class='label-bg'></div> " +
                                                     "     </div> " +
                                                     "  </div>" +
                                                     "</div>");
                                }
                                else {
                                    targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                     " <div class='portfolio-wrapper' data-image='" + dataImage + "?size=1024'> " +
                                                     "     <img src=' " + dataImage + "?size=400' /> " +
                                                     "     <div class='label'> " +
                                                     "         <div class='label-text'>" +
                                                     "             <a class='text-title'> " + dataTitle + "</a> " +
                                                     "         </div> " +
                                                     "         <div class='label-bg'></div> " +
                                                     "     </div> " +
                                                     "  </div>" +
                                                     "</div>");
                                }

                            }

                            checkVideoThumbnails();

                            var y = qs.year;
                            var r = '';
                            var p;

                            if (y) {
                                r = '.' + y;

                                if ($('[data-filter="' + r + '"]').length > 0) {
                                    p = r;
                                }
                            }

                            filterList.init(p);
                            $gloader.addClass('hidden');

                        }
                    });

                }

            });

        }

        if (!year || year == '') {
            $gloader.removeClass('hidden');

            $.get("/WebService/Gallery/Gallery.svc/GetPhotoAlbums/", function (data) {

                var retrievedObjectImage;
                var retrievedObject;
                var dataSelect;
                var dataSelectImage;

                if (data) {

                    targetLi.html("");

                    for (var i = 0; i < data.length; i++) {
                        var dataYear = data[i].Year;
                        results = " " + "." + dataYear;
                        var x = [x, results];
                    }

                    var targetAll = "<li><span class='filter js-first-filter' data-filter='" + x + "'>" + "All" + "</span></li>";
                    targetLi.append(targetAll);

                    for (var i = 0; i < data.length; i++) {
                        var dataYear = data[i].Year;

                        targetLi.append("<li><span class='filter' data-filter='." + dataYear + "'>" + dataYear + "</span></li>");
                    }

                    var allYear = $("ul.clearfix li:first").find('span').attr("data-filter");
                    var $trimComma = allYear.split(',').slice(1);
                    $("ul.clearfix li:first").find('span').attr("data-filter", $trimComma);

                    var targetList = $("#portfoliolist");
                    $.get("/WebService/Gallery/Gallery.svc/GetPhotoGalleries/", function (data) {

                        if (data) {
                            targetList.html("");

                            for (var i = 0; i < data.length; i++) {
                                var dataTitle = data[i].Title;
                                var dataImage = data[i].Image;
                                var dataYear = data[i].Year;
                                var dataVideo = data[i].UrlYoutube;

                                if (dataVideo != '') {
                                    targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                     " <div class='portfolio-wrapper' data-image='' data-video ='" + dataVideo + "'> " +
                                                     "     <img src=' " + dataImage + "?size=400' /> " +
                                                     "     <div class='label'> " +
                                                     "         <div class='label-text'>" +
                                                     "             <a class='text-title'> " + dataTitle + "</a> " +
                                                     "         </div> " +
                                                     "         <div class='label-bg'></div> " +
                                                     "     </div> " +
                                                     "  </div>" +
                                                     "</div>");
                                }
                                else {
                                    targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                     " <div class='portfolio-wrapper' data-image='" + dataImage + "?size=1024'> " +
                                                     "     <img src=' " + dataImage + "?size=400' /> " +
                                                     "     <div class='label'> " +
                                                     "         <div class='label-text'>" +
                                                     "             <a class='text-title'> " + dataTitle + "</a> " +
                                                     "         </div> " +
                                                     "         <div class='label-bg'></div> " +
                                                     "     </div> " +
                                                     "  </div>" +
                                                     "</div>");
                                }

                            }

                            checkVideoThumbnails();

                            var y = qs.year;
                            var r = '';
                            var p;

                            if (y) {
                                r = '.' + y;

                                if ($('[data-filter="' + r + '"]').length > 0) {
                                    p = r;
                                }
                            }

                            filterList.init(p);
                            $gloader.addClass('hidden');

                        }
                    });

                }

            });

        }
        //isTriggered = false;
    } //end js-filters 

    $('body').on("click", "#filters .filter", function () {

        var $thisYear = $(this);
        var textYear = $thisYear.text();

        if (!isTriggered) {

            if ($(".js-filters").length > 0) {


                if (textYear != 'All') {
                    $gloader.removeClass('hidden');

                    $.get("/WebService/Gallery/Gallery.svc/GetPhotoAlbums/?year=" + textYear, function (data) {

                        var retrievedObjectImage;
                        var retrievedObject;
                        var dataSelect;
                        var dataSelectImage;
                        if (data) {

                            targetLi.html("");

                            for (var i = 0; i < data.length; i++) {
                                var dataYear = data[i].Year;
                                results = " " + "." + dataYear;
                                var x = [x, results];
                            }

                            var targetAll = "<li><span class='filter js-first-filter' data-filter='" + x + "'>" + "All" + "</span></li>";
                            targetLi.append(targetAll);

                            for (var i = 0; i < data.length; i++) {
                                var dataYear = data[i].Year;

                                targetLi.append("<li><span class='filter' data-filter='." + dataYear + "'>" + dataYear + "</span></li>");
                            }

                            var allYear = $("ul.clearfix li:first").find('span').attr("data-filter");
                            var $trimComma = allYear.split(',').slice(1);
                            $("ul.clearfix li:first").find('span').attr("data-filter", $trimComma);

                            var targetList = $("#portfoliolist");
                            $.get("/WebService/Gallery/Gallery.svc/GetPhotoGalleries/?year=" + textYear, function (data) {

                                if (data) {

                                    targetList.html("");

                                    for (var i = 0; i < data.length; i++) {
                                        var dataTitle = data[i].Title;
                                        var dataImage = data[i].Image;
                                        var dataYear = data[i].Year;
                                        var dataVideo = data[i].UrlYoutube;

                                        if (dataVideo != '') {
                                            targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                             " <div class='portfolio-wrapper' data-image='' data-video ='" + dataVideo + "'> " +
                                                             "     <img src=' " + dataImage + "?size=400' /> " +
                                                             "     <div class='label'> " +
                                                             "         <div class='label-text'>" +
                                                             "             <a class='text-title'> " + dataTitle + "</a> " +
                                                             "         </div> " +
                                                             "         <div class='label-bg'></div> " +
                                                             "     </div> " +
                                                             "  </div>" +
                                                             "</div>");
                                        }
                                        else {
                                            targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                             " <div class='portfolio-wrapper' data-image='" + dataImage + "?size=1024'> " +
                                                             "     <img src=' " + dataImage + "?size=400' /> " +
                                                             "     <div class='label'> " +
                                                             "         <div class='label-text'>" +
                                                             "             <a class='text-title'> " + dataTitle + "</a> " +
                                                             "         </div> " +
                                                             "         <div class='label-bg'></div> " +
                                                             "     </div> " +
                                                             "  </div>" +
                                                             "</div>");
                                        }

                                    }
                                    checkVideoThumbnails();

                                    var y = textYear;
                                    var r = '';
                                    var p;

                                    if (y) {
                                        r = '.' + y;

                                        if ($('[data-filter="' + r + '"]').length > 0) {
                                            p = r;
                                        }
                                    }

                                    filterList.init(p);
                                    $gloader.addClass('hidden');

                                }
                            });
                        }
                    });

                }// end qs.year        

                if (textYear == 'All') {

                    $gloader.removeClass('hidden');

                    $.get("/WebService/Gallery/Gallery.svc/GetPhotoAlbums/", function (data) {

                        var retrievedObjectImage;
                        var retrievedObject;
                        var dataSelect;
                        var dataSelectImage;
                        if (data) {

                            targetLi.html("");

                            for (var i = 0; i < data.length; i++) {
                                var dataYear = data[i].Year;

                                results = " " + "." + dataYear;
                                var x = [x, results];
                            }

                            var targetAll = "<li><span class='filter js-first-filter' data-filter='" + x + "'>" + "All" + "</span></li>";
                            targetLi.append(targetAll);

                            for (var i = 0; i < data.length; i++) {
                                var dataYear = data[i].Year;
                                targetLi.append("<li><span class='filter' data-filter='." + dataYear + "'>" + dataYear + "</span></li>");
                            }

                            var allYear = $("ul.clearfix li:first").find('span').attr("data-filter");
                            var $trimComma = allYear.split(',').slice(1);
                            $("ul.clearfix li:first").find('span').attr("data-filter", $trimComma);
                            var targetList = $("#portfoliolist");

                            $.get("/WebService/Gallery/Gallery.svc/GetPhotoGalleries/", function (data) {

                                if (data) {
                                    targetList.html("");


                                    for (var i = 0; i < data.length; i++) {
                                        var dataTitle = data[i].Title;
                                        var dataImage = data[i].Image;
                                        var dataYear = data[i].Year;
                                        var dataVideo = data[i].UrlYoutube;

                                        if (dataVideo != '') {
                                            targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                             " <div class='portfolio-wrapper' data-image='' data-video ='" + dataVideo + "'> " +
                                                             "     <img src=' " + dataImage + "?size=400' /> " +
                                                             "     <div class='label'> " +
                                                             "         <div class='label-text'>" +
                                                             "             <a class='text-title'> " + dataTitle + "</a> " +
                                                             "         </div> " +
                                                             "         <div class='label-bg'></div> " +
                                                             "     </div> " +
                                                             "  </div>" +
                                                             "</div>");
                                        }
                                        else {
                                            targetList.append("<div class='portfolio " + dataYear + "' data-cat='" + dataYear + "'> " +
                                                             " <div class='portfolio-wrapper' data-image='" + dataImage + "?size=1024'> " +
                                                             "     <img src=' " + dataImage + "?size=400' /> " +
                                                             "     <div class='label'> " +
                                                             "         <div class='label-text'>" +
                                                             "             <a class='text-title'> " + dataTitle + "</a> " +
                                                             "         </div> " +
                                                             "         <div class='label-bg'></div> " +
                                                             "     </div> " +
                                                             "  </div>" +
                                                             "</div>");
                                        }

                                    }
                                    checkVideoThumbnails();

                                    var y = 'all';
                                    var r = '';
                                    var p;

                                    if (y) {
                                        r = '.' + y;

                                        if ($('[data-filter="' + r + '"]').length > 0) {
                                            p = r;
                                        }
                                    }

                                    filterList.init(p);
                                    $gloader.addClass('hidden');

                                }
                            });
                        }
                    });

                }// end qs.year

            } //end js-filters 
        }
        isTriggered = false;


    }); //end body on click 
    // isTriggered = false;

}(window, jQuery, FXM));
