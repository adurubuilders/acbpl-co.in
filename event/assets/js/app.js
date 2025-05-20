/**
 * @author {Your Name}
 * @created in {Year created}
 */

(function (window, $, fx) {

    var GLOBAL_BREAK_POINT_MOBILE = 767;

    /**
     * @function getYoutubeID
     * @description
     * This function will check whether the given url contains any YouTube stuff. Please add more pattern
     * if there's any.
     *
     * @test (Must return some chars/YouTube ID)
     * - isYoutube('https://youtu.be/MVkENXdwMNI'); -> MVkENXdwMNI
     * - isYoutube('http://youtu.be/MVkENXdwMNI'); -> MVkENXdwMNI
     * - isYoutube('https://www.youtube.com/watch?v=MVkENXdwMNI&feature=youtu.be'); -> MVkENXdwMNI
     * - isYoutube('http://www.youtube.com/watch?v=MVkENXdwMNI&feature=youtu.be'); -> MVkENXdwMNI
     *
     * @note @important
     * I assume that YouTube's video ID has 10 chars of [a-zA-Z0-9_\-].
     *
     * @param {String} url
     * @return {String} - empty string when no matches
     */
    var getYouTubeID = function (url) {
        var ret = '';
        var trimmedUrl = $.trim(url);

        // the thing inside round bracket is youtube id
        var PATTERN = [
            /^https?:\/\/youtu\.be\/([a-zA-Z0-9_\-]{11})[^\s]{0,}$/,
            /^https?:\/\/www.youtube\.com\/watch\?v=([a-zA-Z0-9_\-]{11})[^\s]{0,}$/,
            /^https?:\/\/www.youtube\.com\/embed\/([a-zA-Z0-9_\-]{11})[^\s]{0,}$/
        ];

        $.each(PATTERN, function (k, vid) {
            if (vid.test(trimmedUrl)) {
                ret = trimmedUrl.replace(vid, '$1');
                return false;
            }
        });

        return ret;
    };

    var homeNonTransparentSticky = (function () {
        return {
            init: function () {
                var $menu = $('.sticky-menu');
                var $window = $(window);
                var addClassIfScrollGreaterThan = 0;
                var activeClass = 'sticked';

                if ($menu.length > 0 && $window.length > 0) {
                    $window.on('scroll', function () {
                        var top = $window.scrollTop();

                        if (top > addClassIfScrollGreaterThan) {
                            $menu.addClass(activeClass);
                        } else {
                            $menu.removeClass(activeClass);
                        }
                    });
                }
            }
        };
    }());

    homeNonTransparentSticky.init();

    var menu = (function () {
        var $menu;
        var $htmlBody;
        var $window;
        var hasInit = false;
        var tolerance = 50;

        var go = function ($dom) {
            $htmlBody.stop(true, true).animate({
                'scrollTop': $dom.offset().top - tolerance
            }, 500);
        };

        return {
            init: function () {
                if (hasInit) {
                    return;
                }

                hasInit = true;
                $menu = $('.main-menu');
                $htmlBody = $('html, body');
                $window = $(window);
                $menu.find('a').on('click', function (e) {
                    var target = $(this).attr('href');
                    var $target = $(target.indexOf('#') > -1 ? target : '');

                    if ($target.length > 0) {
                        e.preventDefault();
                        $('#techin-nav').collapse('hide');
                        go($target);
                    }
                });


            },
            Go: go
        };
    }());

    var posDetector = (function () {
        var $window;
        var $lists;
        var $listsWrapper;
        var targetPos = [];
        var offset = 100;
        var resizeTimers;

        // Used for updating @var `targetPos`
        var calculatePos = function () {
            targetPos = null;
            targetPos = [];

            $lists.each(function (k) {
                var target = $.trim($(this).attr('href'));
                var $target = $(target.indexOf('#') > -1 ? target.substr(target.indexOf('#')) : '');

                if ($target.length > 0) {
                    var top = $target.offset().top;

                    targetPos.push({
                        minRange: top - 1,
                        maxRange: top + $target.outerHeight() - 1,
                        filter: $(this).closest('li')
                    });
                }
            });
        };

        var check = function () {
            var pos = $window.scrollTop() + offset;
            var $filter = $();

            $.each(targetPos, function (k, tp) {
                var minRange = tp.minRange;
                var maxRange = tp.maxRange;

                if (pos >= minRange && pos <= maxRange) {
                    $filter = tp.filter;
                    return false;
                }
            });

            if ($filter.length > 0) {
                if (!$filter.hasClass('active')) {
                    $listsWrapper.removeClass('active');
                    $filter.addClass('active');
                }
            } else {
                $listsWrapper.removeClass('active');
            }
        };

        return {
            init: function () {
                $window = $(window);

                if ($window.width() > GLOBAL_BREAK_POINT_MOBILE) {
                    $lists = $('.main-menu').find('a');
                    $listsWrapper = $lists.closest('li');

                    $window.on('load', function () {
                        calculatePos();
                        check();
                    });

                    $window.on('scroll', function () {
                        check();
                    });

                    $window.on('resize', function () {
                        clearTimeout(resizeTimers);
                        resizeTimers = setTimeout(function () {
                            calculatePos();
                            check();
                        }, 50);
                    });
                }
            }
        };
    }());

    var gotoScroll = (function () {

        return {
            init: function () {
                $(".js-goto-anchor a").click(function () {
                    $("html, body").animate({
                        scrollTop: ($($(this).attr("href")).offset().top - 70) + "px"
                    }, {
                        duration: 1500,
                        easing: "swing",
                        queue: false
                    });
                    return false;
                });
            }
        }

    }());

    var activeHeaderOnMobile = (function () {

        return {
            init: function () {
                $('#techin-nav').on('shown.bs.collapse',function(){
                    var activeClass = 'active';
                    var $header = $('header');
                    $header.addClass(activeClass);
                });
                $('#techin-nav').on('hidden.bs.collapse',function(){
                    var activeClass = 'active';
                    var $header = $('header');
                    $header.removeClass(activeClass);
                });
            }
        }

    }());

    var rainbowConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#e26594", "#f59470", "#b3d981", "#9b76b7", "#cecece"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 2,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#cecece",
                "opacity": 1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    var homeConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#e26594", "#f59470", "#b3d981", "#9b76b7", "#cecece"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 3,
                    "opacity_min": 1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 2,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#cecece",
                "opacity": 1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    //particlesJS('rainbow-3', rainbowConfig);

    //particlesJS('speaker', rainbowConfig);

    var scrollIndicator = ( function(){
        return{
            init: function(){
                var s = .8;
                var a = new TimelineMax({
                    repeat: -1,
                    repeatDelay: s / 2 * 3
                });

                a.set(".scroll-handle", {
                    z: 1e-4,
                    y: "0px",
                    scale: 0
                }).set(".scroll-bar-top", {
                    height: "110px"
                }).to(".scroll-handle", s / 2, {
                    scale: 1
                }, "syncOne").to(".scroll-bar-top", s / 2, {
                    height: "0px"
                }, "syncOne").to(".scroll-handle", s, {
                    y: "90px"
                }, "syncTwo").to(".scroll-bar-bottom", s, {
                    bottom: 0,
                    height: "0px",
                    delay: .0132
                }, "syncTwo").to(".scroll-bar-top", s , {
                    height: "90px",
                    delay: .0135
                }, "syncTwo").to(".scroll-handle", s / 2, {
                    scale: 0,
                    height: "90px",
                    delay: .2
                }, "syncThree").to(".scroll-bar-top", s / 2, {
                    height: "110px",
                    delay: .2
                }, "syncThree");
            }
        }
    }());

    var carouselActive = (function () {
        var $window = $(window);
        var $owl = $('.owl-carousel');
        var $tempItems;
        var temp = 0;
        var temp2 = 0;
        var isMobile;
        var mobileBreakpoint = 767;
        var count = 0;
        var owlTimers;
        var owlOptions = {
            items: 1,
            autoplaySpeed: 2000,
            dots: true,
            loop: false,
            autoHeight: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
        };
        var hasInit = false;

        var triggerAnimate = function () {
            $.force_appear();
        };

        var _owlHandler = function(){
            $owl.on("initialized.owl.carousel", function (event) {
                owlHeight();
                playVideo();
            });

            $owl.owlCarousel(owlOptions);

            $owl.on("changed.owl.carousel", function () {
                clearTimeout(owlTimers);
                owlTimers = setTimeout(function () {
                    owlHeight();
                    playVideo();
                }, 50);
            });

            $owl.find(".item").on("click", '.video-play', function(){
                var $this = $(this);
                var vidContainer = $this.parent();
                var video = vidContainer.find('video');

                $this.css("display", "none");
                video[0].play();
            });
        };

        var _setNewOwl = function(appends){
            $owl.trigger("destroy.owl.carousel");
            $owl.empty();
            $owl.append(appends);

            _owlHandler();
        };

        var _resizeHandlers = function () {
            var owlData = $owl.data("owlCarousel");
            var totalItem = $owl.find('.item').length;

            if (!$owl.data("owlCarousel") && !hasInit) {
                hasInit = true;

                // it it's mobile, don't append the video src
                if ($window.width() > 767) {
                    $owl.find('.video-container').each(function () {
                        var $this = $(this);
                        var $video = $('<video></video>');
                        var $videoSources = $this.find('.video-sources');
                        var $source = $('<source/>');
                        var $lists = $videoSources.find('li');

                        if ($lists.length > 0) {
                            $video.prop('autoplay',true);
                            $video.prop('loop',true);

                            $lists.each(function () {
                                var $li = $(this);
                                var $src = $source.clone();
                                var src = FXM.ifUndefined($li.attr('data-src'), '');
                                var type = FXM.ifUndefined($li.attr('data-type'), '');

                                if (src != '' && type != '') {
                                    $src.attr('src', src);
                                    $src.attr('type', type);
                                    $src.appendTo($video);
                                }
                            });

                            $videoSources.after($video);
                        }
                    });
                }

                $owl.on("initialized.owl.carousel", function (event) {
                    playVideo();
                });

                $owl.owlCarousel($.extend(owlOptions, {
                    loop: totalItem > 1,
                    dots: totalItem > 1,
                    mouseDrag: totalItem > 1,
                    nav: totalItem > 1
                }));

                $owl.on("changed.owl.carousel", function () {
                    clearTimeout(owlTimers);
                    owlTimers = setTimeout(function () {
                        playVideo();
                        triggerAnimate();
                    }, 10);
                });

                $owl.on("translated.owl.carousel", function () {
                    triggerAnimate();
                });

                $owl.find(".item").on("click", '.video-play', function(){
                    var $this = $(this);
                    var vidContainer = $this.parent();
                    var video = vidContainer.find('video');

                    $this.css("display", "none");
                    video[0].play();
                });
            }
        };

        var _init = function () {
            $window = $(window)
            $tempItems = $owl.find(".item");

            if(FXM.isMobile.iOS()){
                $('body').addClass("isapple");
            }

            _resizeHandlers();
        };

        var playVideo = function () {
            var owl = $(".owl-item");
            var owlA = $(".owl-item.active");
            var vid = owl.find('video');
            var vidA = owlA.find('video');
            var $body = $('body').filter(".isapple");

            if ($body.length != 0) {
                vid.parent().find(".video-play").css("display", "block");
                count++;
            }

            vid.each(function () {
                $(this).get(0).pause();
            });

            if($body.length == 0){
                if (vidA.length != 0) {
                    vidA[0].play();
                }
            }

        };

        return {
            init: _init
        }

    }());

    var squareBoxSpeaker = (function(){

        return{
            init: function(){
                TweenLite.defaultEase = Linear.easeNone;


                //show the square only once js has run
                //visibility set to hidden in css panel
                TweenLite.set(".square-animation", {visibility:"visible"});



                var tl = new TimelineMax({
                    repeat:-1
                });
                var size = 390;
                tl.fromTo(".l1", 1, {height:0}, {height:size})
                    .fromTo(".l2", 4, {width:0}, {width:size})
                    .fromTo(".l3", 1, {height:0}, {height:size})
                    .fromTo(".l4", 1, {width:0}, {width:size});
                tl.timeScale(1);



                //tl.reverse();//play faster

            }
        }

    }());

    var BackToTopTemplate = (function () {
        var $body;
        var hasInit = false;

        var Setup = function () {
            $body = $('body');
            $body.append(GetTemplate);
        };

        var GetTemplate = function () {
            return '<div class="back-to-top is-hidden">' +
                '<a href="javascript:void(0)" title="Back to Top">' +
                '<span class="fa fa-angle-up"></span>' +
                '</a>' +
                '</div>';
        };

        return {
            install: function (callback) {
                if (!hasInit) {
                    hasInit = true;
                    Setup();

                    if ($.isFunction(callback)) {
                        callback();
                    }
                }
            }
        };
    }());

    BackToTopTemplate.install(function () {
        FXM.backToTop(".back-to-top", {
            duration: 450
        });
    });

    var $descData = $('#banner-small').find('.banner-small-container').attr('data-desc');
    var $textTitle = $('#banner-small').find('.banner-small-container .text--black');
    var $countDownTime = $('#banner-small').find('.banner-small-container').attr('data-count-time');
    var hasHidden = false;

    var hideStuff = function () {
        if (!hasHidden && (hasHidden = true)) {
            $('#clock').hide();
            $textTitle.addClass("hidden");
            $('#button').before($descData);
        }
    };

    var countdownTimer = (function () {
        return {
            init: function () {
                $('#clock').
                    countdown($countDownTime, function (event) {
                        var o = event.offset;

                        if (o.seconds == 0 && o.minutes == 0 && o.hours == 0) {
                            hideStuff();
                        }

                        $(this).html(event.strftime(
                            '<div class="cd-col days"><span class="cd-number">%D </span><span class="cd-label">DAYS</span></div>' +
                            '<div class="cd-col hours"><span class="cd-number">%H </span><span class="cd-label">HOURS</span></div>' +
                            '<div class="cd-col minutes"><span class="cd-number">%M </span><span class="cd-label">MINUTES</span></div>' +
                            '<div class="cd-col seconds"><span class="cd-number">%S </span><span class="cd-label">SECONDS</span></div>'));
                    }).
                    on('finish.countdown', hideStuff).
                    on('stop.countdown', hideStuff);
            }
        }
    }());

    var speakersCarousel = (function(){
        var $mobileCarousel = $();
        var $desktopCarousel = $();
        var $window;
        var hasInit = false;
        var mobileBreakpoint = 767;
        var classHidden = 'hidden';

        var initMobileCarousel = function () {
            $mobileCarousel.addClass('owl-carousel');
            $mobileCarousel.owlCarousel({
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                ],
                loop: false,
                mouseDrag: true,
                dots: false,
                items: 1
            });
        };

        var initDesktopCarousel = function () {
            $desktopCarousel.owlCarousel({
                nav: true,
                navText: [
                    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                ],
                loop: false,
                mouseDrag: true,
                dots: false,
                items: 1
            });
        };

        var checkCarousel = function () {
            // on mobile, hide desktop, show mobile
            if ($window.width() <= mobileBreakpoint) {
                $desktopCarousel.addClass(classHidden);
                $mobileCarousel.removeClass(classHidden);

                if (!$mobileCarousel.data('hasInit')) {
                    $mobileCarousel.data('hasInit', true);
                    initMobileCarousel();
                }
            }

            // on desktop, hide mobile, show desktop
            else {
                $desktopCarousel.removeClass(classHidden);
                $mobileCarousel.addClass(classHidden);

                if (!$desktopCarousel.data('hasInit')) {
                    $desktopCarousel.data('hasInit', true);
                    initDesktopCarousel();
                }
            }
        };

        var cloneCarouselForDesktop = function () {
            var $spItems = $mobileCarousel.find('.sp__item');
            var $dcItem = $('<div class="owlSpeakers_item">');

            if ($spItems.length > 0) {
                $desktopCarousel = $('<div class="owlSpeakers owl-carousel js-speakers-carousel-desktop"></div>');

                var $currentDcItem  = $();
                var totalItem = $spItems.length - 1;
                var currentIndex = 0;
                var maxItemPerPage = 6;

                $spItems.each(function (i) {
                    if (currentIndex == 0) {
                        $currentDcItem = $dcItem.clone();
                    }

                    $currentDcItem.append($(this).clone());
                    currentIndex += 1;

                    if (currentIndex == maxItemPerPage || i == totalItem) {
                        currentIndex = 0;
                        $desktopCarousel.append($currentDcItem);
                    }
                });

                $mobileCarousel.after($desktopCarousel);
            }
        };

        return {
            init: function (resetInit) {
                resetInit = FXM.isMatch(resetInit, [1, true, 'true']);

                if (resetInit) {
                    $('.js-speakers-carousel-desktop').remove();
                    hasInit = false;
                }

                // by default, take the mobile carousel first
                if (!hasInit && ($mobileCarousel = $('.js-speakers-carousel-mobile')) && ($mobileCarousel.length > 0) && (hasInit = true)) {
                    $window = $(window);
                    cloneCarouselForDesktop();

                    FXM.Events.onWindowResized.add(function () {
                        checkCarousel();
                    }, FXM.Events.onWindowResized.options.RUN_ON_ADDED);

                    $mobileCarousel.data('hasInit', false);
                }
            }
        }

        

    }());
    
    //fix speakers carousel after edit content list speakers
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

                // by default, take the mobile carousel first
                if (($mobileCarousel = $('.js-speakers-carousel-mobile')) && ($mobileCarousel.length > 0)) {
                    setTimeout(function () {
                        if ($('.js-speakers-carousel-desktop').length == 0) {
                            speakersCarousel.init(true);
                        }
                    }, 500);
                }
            };
        }
    }
    

    var sameBox = FXM.sameHeight(".js-fix-height", {
        disableAt: 767
    });

    var speakerDetailController = function () {
        var $speaker = $();
        var $spItem = $();
        var $target = $();
        var $targetCollapse = $();

        return {
            init: function () {
                if ($speaker.length == 0 && !$speaker.hasClass('has-init')) {
                    $speaker.addClass('has-init');

                    var personName = $.trim(FXM.parseQueryString()['person']);

                    $spItem = $('.sp__image');
                    $target = $spItem.filter('[data-person="' + personName + '"]');

                    if ($target.length > 0) {
                        $targetCollapse = $target.closest('.panel-collapse');

                        if ($targetCollapse.length > 0) {
                            $targetCollapse.collapse('show');
                            $target.addClass('person-active');
                            $('body, html').animate({
                                'scrollTop': $target.offset().top - $('.sticky-menu').outerHeight() - 30
                            }, {
                                duration: 500
                            })
                        }
                    }
                }
            }
        };
    }();

    var galleryModal = function () {
        var $root;
        var $tabsTitle;
        var $modal;
        var $modalVideoWrapper;
        var $modalImageWrapper;
        var $modalImage;
        var $modalGalleryTitle;
        var $modalTitle;
        var $modalPrev;
        var $modalNext;
        var $currentActive;
        var $currentAlbums;
        var currentImage = -1;
        var currentIndex = -1;
        var classDisabled = 'disabled';
        var classLoading = 'is-loading';
        var classHidden = 'hidden';

        // youtube related
		var youtubeFirstAppear = false;
       // var $youtubePlayIcon = $('<div class="play-btn"></div>');
        var $youtubeIframeTemplate = $('<iframe src="" frameborder="0" allowfullscreen></iframe>');
        var $bootstrapVideo = $('<div class="embed-responsive embed-responsive-16by9"></div>');
        var $currentYoutubeIframe = $();
        var YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/';
        var YOUTUBE_JS_API = '?autoplay=0&enablejsapi=1&showinfo=0&modestbranding=1&autohide=1&showinfo=0&wmode=opaque';

        var checkIndex = function () {
            if ($currentAlbums.eq(currentIndex + 1).length > 0) {
                $modalNext.removeClass(classDisabled);
            } else {
                $modalNext.addClass(classDisabled);
            }

            if ($currentAlbums.eq(currentIndex - 1).length > 0 && (currentIndex - 1) > -1) {
                $modalPrev.removeClass(classDisabled);
            } else {
                $modalPrev.addClass(classDisabled);
            }
        };

		var resetVideo = function () {
			if ($currentYoutubeIframe.length > 0) {
				var iframe = $currentYoutubeIframe[0].contentWindow;

				if (iframe && $.isFunction(iframe.postMessage)) {
					iframe.postMessage('{"event": "command", "func": "stopVideo", "args":""}', '*');
				}
			}
			
			// empty existing youtube
			$currentYoutubeIframe = $();
			$modalVideoWrapper.empty();
		};
        	
		var modalOnClick = function () {

		    //var query = $('#modal-image').attr('src');
		    //var imgData = $('.portfolio-wrapper').find('img').attr('src');

		    //var $curUrl2 = FXM.addQueryString(FXM.stripQueryString(imgData), {
		    //    size: 1240
		    //});
		    
            var $this = $(this);
            var $portofolio = $this.closest('.portfolio');
		    var dataTarget = FXM.ifUndefined($this.attr('data-image'), '');
            var dataTargetYoutube = FXM.ifUndefined($this.attr('data-video'), '');
            var text = FXM.ifUndefined($this.find('.text-title').html(), '');
            var isYoutube = false;
			$tabsTitle = $('.js-filters').find('span');
		    
			if (dataTargetYoutube != '') {
				var youtubeUrl = getYouTubeID(dataTargetYoutube);

				if (youtubeUrl != '') {
					isYoutube = true;
					dataTarget = youtubeUrl;
				}
			}
			
			if (dataTarget == currentImage) {
			    $modal.modal('show');
                checkIndex();                

            } else {
               currentImage = dataTarget;

			    //currentImage = $curUrl2;

                if (isYoutube) {
                    // empty existing youtube
                    $modalVideoWrapper.empty();

                    // youtube gallery
                    $modalVideoWrapper.removeClass(classHidden);
                    $modalImageWrapper.addClass(classHidden);

                    // append new video
                    $currentYoutubeIframe = $youtubeIframeTemplate.clone();
					youtubeFirstAppear = true;
					
                    var $bv = $bootstrapVideo.clone();

                    $currentYoutubeIframe.attr({
                        'src': YOUTUBE_EMBED_URL + dataTarget + YOUTUBE_JS_API
                    });

                    $bv.append($currentYoutubeIframe);
                    $modalVideoWrapper.append($bv);
                } else {
					// reset video
					resetVideo();
					
                    // image gallery
                    $modalVideoWrapper.addClass(classHidden);
                    $modalImageWrapper.removeClass(classHidden);
                    $modalImageWrapper.addClass(classLoading);
                    $modalImage.on('load', function () {
                        $modalImageWrapper.removeClass(classLoading);
                    });
                    $modalImage.attr('src', currentImage);
                   // $modalImage.attr('src', currentImage);
                }

                $modalTitle.html(text);
                $modalGalleryTitle.html($tabsTitle.filter('[data-filter=".' + $portofolio.attr('data-cat') + '"]').html());

                $currentActive = $portofolio;
                $currentAlbums = $root.find('.portfolio').filter(':visible');

                $currentAlbums.each(function (i) {
                    var $this = $(this);

                    if ($this.filter($currentActive).length > 0) {
                        currentIndex = i;
                    }
                });

                if (!$modal.hasClass('in')) {
                    $modal.modal('show');
                }

                checkIndex();
			}


        };

        //var checkVideoThumbnails = function () {
        //    $root.find('.portfolio-wrapper').each(function () {
        //        var $this = $(this);
        //        var $ytPlayIcon = $youtubePlayIcon.clone();
        //        var videoUrl = getYouTubeID(FXM.ifUndefined($this.attr('data-video'), ''));

        //        if (videoUrl != '' && $this.find('.play-btn').length == 0) {
        //            $this.append($ytPlayIcon);
        //        }
        //    });
        //};

        var attachEvents = function () {
            $root.on('click', '.portfolio-wrapper', function () {
                
                modalOnClick.call(this);
            });

            $modalPrev.on('click', function (e) {
                e.preventDefault();

                if (!$(this).hasClass(classDisabled)) {
                    if ($currentActive.length > 0) {
                        modalOnClick.call($currentAlbums.eq(currentIndex - 1).find('.portfolio-wrapper')[0]);
                    }
                }
            });

            $modalNext.on('click', function (e) {
                e.preventDefault();

                if (!$(this).hasClass(classDisabled)) {
                    if ($currentActive.length > 0) {
                        modalOnClick.call($currentAlbums.eq(currentIndex + 1).find('.portfolio-wrapper')[0]);
                    }
                }
            });

            $root.on('mixEnd', function () {
                // reset state
                $modalPrev.removeClass(classDisabled);
                $modalNext.removeClass(classDisabled);
            });

            $modal.on('hide.bs.modal', function () {
                if ($currentYoutubeIframe.length > 0) {
                    var iframe = $currentYoutubeIframe[0].contentWindow;

                    if (iframe && $.isFunction(iframe.postMessage)) {
                        iframe.postMessage('{"event": "command", "func": "stopVideo", "args":""}', '*');
                    }
                }
            });
        };

        return {
            init: function () {
                $root = $('#portfoliolist');
                $modal = $('#galleryModal');
                $tabsTitle = $('.js-filters').find('span');
                $modalImageWrapper = $modal.find('#image-loader');
                $modalImage = $modal.find('#modal-image');
                $modalVideoWrapper = $modal.find('#video-loader');
                $modalGalleryTitle = $modal.find('#modal-gallery-title');
                $modalTitle = $modal.find('#modal-title');
                $modalPrev = $modal.find('.js-modal-prev');
                $modalNext = $modal.find('.js-modal-next');

                if ($root.length > 0 && $modal.length > 0) {
                    attachEvents();
                   // checkVideoThumbnails();
                }
            }
        }
    }();

    var formValidation = (function(){
        return {
            init: function(){
                if ($('.js-formValidate').length > 0) {
                    $(".js-formValidate").validate({
                        email: {
                            required: true,
                            email: true
                        },
                        messages: {
                            email: "Please enter a valid email address"
                        }
                    });
                }
            }
        }
    }());

    var dataTables = (function(){
        return {
            init: function(){
                if($('.dataTableJS').get(0)){
                    $('.dataTableJS').DataTable({
                        searching: false,
                        responsive: true,
                        iDisplayLength: 100
                    });
                }
            }
        }
    }());

    var touchSpinNumber = (function(){
        return {
            init: function(){
                var $ts = $('.js-touchspin');

                if ($ts.length > 0){
                    $ts.each(function () {
                        var $this = $(this);

                        $this.TouchSpin({
                            verticalbuttons: true,
                            min: FXM.ifUndefined($this.attr('min'), 0, function (i) { return parseInt(i); }),
                            max: FXM.ifUndefined($this.attr('max'), 100, function (i) { return parseInt(i); })
                        });
                    });
                }
            }
        }
    }());

    var techDetailCarousel = (function(){
        return {
            init: function(){
                $(".techOwl-carousel").owlCarousel({
                    items: 1,
                    nav: true,
                    navText: [
                        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
                    ]
                });
            }
        }
    }());

    //for sticky stuff
    var liveBlog = (function () {
        var $window;
        var $body;
        var $root;
        var $nav;
        var $navLists;
        var $boxesWrapper;
        var $boxes;
        var viewportWidth = 0;
        var boxesHeight = 0;
        var navOffsetTop = 0;
        var navOffsetBottom = 0;
        var navHeight = 0;
        var currentIndex = 0;
        var qs = {};
        var classActive = "active";
        var classStick =  "stick";
        var classStickBottom = "stick-bottom";
        var additionalOffsetValue = {
            DESKTOP: 106,
            TABLET_LANDSCAPE: 106,
            TABLET_PORTRAIT: 56,
            MOBILE: 56
        };
        var additionalOffset = 106; // header sticky total height
        var targetAttribute = "data-target";
        var htmlArrowLeft = "<i class='fa fa-arrow-right' aria-hidden='true'></i>";

        var breakPoint = 991;
        var isStickyEnabled = true;
        var isScrollEnabled = false;

        var htmlSocial = '' +
                // Facebook based on meta og tag, so no need to include additional information (only url info)
                // @backup
                // addthis:title="{{Title}}" addthis:description="{{Description}}" addthis:url="{{Url}}" "{{Media}}"
            '<div class="live-blog__social">' +
            '   <a href="javascript:void(0);" title="Share to Facebook" class="addthis_button_facebook btn_fb" addthis:url="{{Url}}">' +
            '       <i class="fa fa-facebook" aria-hidden="true"></i>' +
            '       <span class="sr-only">Facebook</span>' +
            '   </a>' +
            '   <a href="javascript:void(0);" title="Share to Twitter" class="addthis_button_twitter btn_twitter" addthis:title="{{Title}} #SIEW2017" addthis:url="{{Url}}">' +
            '       <i class="fa fa-twitter" aria-hidden="true"></i>' +
            '       <span class="sr-only">Twitter</span>' +
            '   </a>' +
            '</div>';

        var replace = FXM.Template.replace;

        // query string key to be parsed
        var SECTION_QUERY = "section";

        // this things must be unique
        // key is the offset
        // offsetA-offsetB
        // e.g. "0-100" means, this item is in between 0px and 100px
        // sample data
        // {
        //     "0-100": {
        //         offset: { ... }, $dom: $(dom), $nav: $(dom), options: { ... }
        //     }
        // }
        //
        var data = {};

        var getRangeOffset = function ($dom) {
            var offset = $dom.offset();
            var startOffset = 0;
            var endOffset = 0;
            var outerHeight = $dom.outerHeight();

            if (offset) {
                startOffset = offset.top;
            }

            endOffset = startOffset + outerHeight;

            return {
                from: Math.round(startOffset),
                to:  Math.round(endOffset)
            };
        };

        var clearState = function () {
            // for nav, clear any states first
            $nav.removeClass(classStick);
            $nav.removeClass(classStickBottom);
        };

        var refresh = function () {
            viewportWidth = $window.width();

            clearState();

            if (viewportWidth >= 1200) {
                additionalOffset = additionalOffsetValue.DESKTOP;
            } else if (viewportWidth >= 992) {
                additionalOffset = additionalOffsetValue.TABLET_LANDSCAPE;
            } else if (viewportWidth >= 768) {
                additionalOffset = additionalOffsetValue.TABLET_PORTRAIT;
            } else {
                additionalOffset = additionalOffsetValue.MOBILE;
            }

            boxesHeight = $boxesWrapper.outerHeight();
            navHeight = $nav.outerHeight();

            var navOffset = $nav.offset();
            var boxesOffset = $boxesWrapper.offset();

            if (navOffset) {
                navOffsetTop = navOffset.top;

                if (boxesOffset) {
                    navOffsetBottom = (boxesOffset.top + boxesHeight) - navHeight;
                }
            }

            $.each(data, function (k, item) {
                item.offset = getRangeOffset(item.$dom);
            });

            if ($window.width() <= breakPoint) {
                // isScrollEnabled = false;
                isStickyEnabled = false;
            } else {
                // isScrollEnabled = true;
                isStickyEnabled = !(navHeight > boxesHeight);
            }

            checkScroll();
        };

        // here's the thing
        // - check scroll
        // - make nav sticky
        var checkScroll = function () {
            var currentPosition = $window.scrollTop() + additionalOffset;

            if (isScrollEnabled) {
                $.each(data, function (k, item) {
                    var from = item.offset.from;
                    var to = item.offset.to;
                    var $nav = item.$nav;

                    if (currentPosition >= from && currentPosition <= to && !$nav.hasClass(classActive)) {
                        $navLists.removeClass(classActive);
                        $nav.addClass(classActive);
                    }
                });
            }

            if (isStickyEnabled) {
                // nav sticky
                if (currentPosition >= navOffsetTop && currentPosition <= navOffsetBottom) {
                    if (!$nav.hasClass(classStick)) {
                        $nav.removeClass(classStickBottom);
                        $nav.addClass(classStick);
                    }
                } else {
                    if (currentPosition < navOffsetTop) {
                        if ($nav.hasClass(classStick)) {
                            $nav.removeClass(classStick);
                        }
                    } else {
                        if (currentPosition > navOffsetBottom) {
                            if (!$nav.hasClass(classStickBottom)) {
                                $nav.removeClass(classStick);
                                $nav.addClass(classStickBottom);
                            }
                        }
                    }
                }
            }
        };

        var goto = function (target) {
            var item = data[target.replace(/^\s*#/, "")];

            if (item && item.offset) {
                $window.scrollTop(item.offset.from - additionalOffset);
                checkScroll();
            }
        };

        var attachEvent = function () {
            $body.on("siew.cookie.font", function () {
                refresh();
            });

            $(function () {
                refresh();
            });

            $window.on("scroll", function () {
                checkScroll();
            });

            $window.on("load", function () {
                if (qs[SECTION_QUERY]) {
                    setTimeout(function () {
                        refresh();
                        goto(qs[SECTION_QUERY]);
                    }, 1000);
                } else {
                    refresh();
                }
            });

            FXM.Events.onWindowResized.add(function () {
                refresh();
            });

            // Unfortunately, we need to refresh every X seconds to refresh the position and stuff,
            // because we are using `dynamic` widget such as Twitter and YouTube
            (function x() {
                refresh();
                setTimeout(x, 5000);
            }());
        };

        return {
            init: function () {
                qs = FXM.parseQueryString();

                $window = $(window);
                $body = $(document.body);
                $root = $(".js-stick-here");
                $nav = $root.find(".js-stick-here-stick");
                $boxesWrapper = $root.find(".js-stick-here-content");

                refresh();
                attachEvent();
            }
        }
    }());

    liveBlog.init();

    //var sameBoxByParent = FXM.sameHeightByParent(".js-sh-by-parent", ".js-sh-parent", {
    //    disableAt: 767
    //});

    FXM.bsAccordion();

    var CKEDITOR_BASEPATH = '/assets/js/plugins/ckeditors/';

    $(function () {
        menu.init();
        posDetector.init();
        gotoScroll.init();
        activeHeaderOnMobile.init();
        carouselActive.init();
        scrollIndicator.init();
        countdownTimer.init();
        speakersCarousel.init();
        speakerDetailController.init();
        techDetailCarousel.init();
        //squareBoxSpeaker.init();
        //filterList.init();
        galleryModal.init();
        formValidation.init();
        dataTables.init();
        touchSpinNumber.init();

        $('[data-toggle="tooltip"]').tooltip();

        if ($('.filer_inputImage').length > 0) {
            $('.filer_inputImage').fileuploader({
                showThumbs: true,
                addMore: true,
                extensions: ["jpg", "jpeg", "png"],
                maxSize: 10.5,
                captions: {
                    button: "Choose",
                    feedback: "Choose Images to Upload"
                },
                thumbnails: {
                    onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                        var filePath;
                        var $img = $('<img/>');
                        var limit = {
                            width: FXM.ifUndefined(inputEl.attr("data-limit-width"), -1, function (v) {
                                return parseInt(v);
                            }),
                            height: FXM.ifUndefined(inputEl.attr("data-limit-height"), -1, function (v) {
                                return parseInt(v);
                            }),
                            minWidth: FXM.ifUndefined(inputEl.attr("data-limit-min-width"), -1, function (v) {
                                return parseInt(v);
                            }),
                            minHeight: FXM.ifUndefined(inputEl.attr("data-limit-min-height"), -1, function (v) {
                                return parseInt(v);
                            })
                        };

                        if (item && item.file) {
                            if (typeof item.file == "string") {
                                filePath = item.file;
                            } else {
                                filePath = URL.createObjectURL(item.file);
                            }
                        }

                        $img.appendTo('body');
                        $img.css({
                            position: 'fixed',
                            top: '-9999px',
                            left: '-9999px',
                            visibility: 'hidden'
                        });

                        if (filePath) {
                            $img.attr('src', filePath).on('load', function () {
                                var $this = $(this);
                                var dim = {
                                    width: this.width,
                                    height: this.height
                                };

                                if (limit.width > -1 && limit.height > -1) {
                                    if (dim.width > limit.width || dim.height > limit.height) {
                                        alert("Image resolution should not exceed " + limit.width + "x" + limit.height + " pixels.");
                                        item.remove();
                                    }
                                }

                                if (limit.minWidth > -1 && limit.minHeight > -1) {
                                    if (dim.width < limit.minWidth || dim.height < limit.minHeight) {
                                        alert("Image resolution should be at least " + limit.minWidth + "x" + limit.minHeight + " pixels.");
                                        item.remove();
                                    }
                                }

                                $img.remove();
                            });
                        }
                    }
                }
            });
        }

        if ($('.filer_inputSingleImage').length > 0) {
            $('.filer_inputSingleImage').fileuploader({
                showThumbs: true,
                addMore: false,
                extensions: ["jpg", "jpeg", "png"],
                maxSize: 10.5,
                limit: 1,
                captions: {
                    button: "Choose",
                    feedback: "Choose Image to Upload"
                },
                thumbnails: {
                    onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                        var filePath;
                        var $img = $('<img/>');
                        var limit = {
                            width: FXM.ifUndefined(inputEl.attr("data-limit-width"), -1, function (v) {
                                return parseInt(v);
                            }),
                            height: FXM.ifUndefined(inputEl.attr("data-limit-height"), -1, function (v) {
                                return parseInt(v);
                            }),
                            minWidth: FXM.ifUndefined(inputEl.attr("data-limit-min-width"), -1, function (v) {
                                return parseInt(v);
                            }),
                            minHeight: FXM.ifUndefined(inputEl.attr("data-limit-min-height"), -1, function (v) {
                                return parseInt(v);
                            })
                        };

                        if (item && item.file) {
                            if (typeof item.file == "string") {
                                filePath = item.file;
                            } else {
                                filePath = URL.createObjectURL(item.file);
                            }
                        }

                        $img.appendTo('body');
                        $img.css({
                            position: 'fixed',
                            top: '-9999px',
                            left: '-9999px',
                            visibility: 'hidden'
                        });

                        if (filePath) {
                            $img.attr('src', filePath).on('load', function () {
                                var $this = $(this);
                                var dim = {
                                    width: this.width,
                                    height: this.height
                                };

                                if (limit.width > -1 && limit.height > -1) {
                                    if (dim.width > limit.width || dim.height > limit.height) {
                                        alert("Image resolution should not exceed " + limit.width + "x" + limit.height + " pixels.");
                                        item.remove();
                                    }
                                }

                                if (limit.minWidth > -1 && limit.minHeight > -1) {
                                    if (dim.width < limit.minWidth || dim.height < limit.minHeight) {
                                        alert("Image resolution should be at least " + limit.minWidth + "x" + limit.minHeight + " pixels.");
                                        item.remove();
                                    }
                                }

                                $img.remove();
                            });
                        }
                    }
                }
            });
        }

        if ($('.filer_inputFiles').length > 0) {
            $('.filer_inputFiles').fileuploader({
                showThumbs: true,
                addMore: true,
                extensions: ["pdf", "txt", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "ai", "eps", "svg", "rar", "zip"],
                maxSize: 10.5,
                captions: {
                    button: "Choose",
                    feedback: "Choose Files to Upload",
                    errors: {
                        filesType: "Only TXT/ PDF/ DOC/ DOCX/ PPT/ PPTX/ XLS/ XLSX/ AI/ EPS/ SVG/ RAR/ ZIP formats are allowed"
                    }
                }
            });
        }

        if ($('.filer_inputFilesSingle').length > 0) {
            $('.filer_inputFilesSingle').fileuploader({
                showThumbs: true,
                addMore: true,
                extensions: ["ai", "eps"],
                maxSize: 10.5,
                limit: 1,
                captions: {
                    button: "Choose",
                    feedback: "Choose Files to Upload",
                    errors: {
                        filesType: "Only AI or EPS format are allowed"
                    }
                }
            });
        }

        //if ($('.table').length > 0){
        //    $('.table').footable();
        //}

        if ($('#particles-js').length > 0){
            particlesJS('particles-js', homeConfig);
        }

        if ($('#rainbow-1').length > 0){
            particlesJS('rainbow-1', rainbowConfig);
        }

        if ($('.js-selectNormal').length > 0) {
            $('.js-selectNormal').select2({
                minimumResultsForSearch: Infinity
            });
        }

        if ($('.js-basic-single').length > 0) {
            $('.js-basic-single').select2({
            });
        }

        if ($('.js-basic-multiple').length > 0) {
            $(".js-basic-multiple").select2();
        }

        if ($('.js-basic-tagging').length > 0) {
            $(".js-basic-tagging").select2({
                tags: true
            });
        }

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var iframe = $(e.relatedTarget.hash).find('iframe');
            var src = iframe.attr('src');
            iframe.attr('src', '');
            iframe.attr('src', src);
        });


        var $ckeditors = $('.ckeditorSimple');
        var ckeditorsInstance = [];

        if ($ckeditors.length > 0) {
            $ckeditors.each(function () {
                var $ckeditor = $(this);
                var isEnabled = FXM.ifUndefined($ckeditor.attr('data-enable-word-count'), false, function (val) {
                    return FXM.isMatch(val, ['true', '1', true, 1]);
                });
                var maxWordCount = FXM.ifUndefined($ckeditor.attr('data-max-word-count'), -1, function (val) {
                    return parseInt(val);
                });
                var minWordCount = FXM.ifUndefined($ckeditor.attr('data-min-word-count'), -1, function (val) {
                    return parseInt(val);
                });
                var maxCharCount = FXM.ifUndefined($ckeditor.attr('data-max-char-count'), -1, function (val) {
                    return parseInt(val);
                });
                var notifDuration = FXM.ifUndefined($ckeditor.attr('data-duration'), 3000, function (val) {
                    return parseInt(val);
                });
                var messageOnWordOrCharReached = FXM.ifUndefined($ckeditor.attr('data-message-on-max-word-or-char'), '');
                var messageOnWordOrCharMinimum = FXM.ifUndefined($ckeditor.attr('data-message-on-min-word-or-char'), '');
                var setup = {};

                if (isEnabled) {
                    setup = {
                        wordcount: {
                            showParagraphs: false,
                            showCharCount: true,
                            maxWordCount: maxWordCount,
                            maxCharCount: maxCharCount,
                            minWordCount: minWordCount
                        }
                    };
                }

                var editor = $ckeditor.ckeditor(setup).editor;

                if (editor) {
                    (function (editor) {
                        var notifLimitReached;
                        var minLimitReached;

                        if (messageOnWordOrCharReached != '') {
                            editor.on('limitReached', function () {
                                if (!notifLimitReached) {
                                    notifLimitReached = new CKEDITOR.plugins.notification(editor, {
                                        message: messageOnWordOrCharReached,
                                        duration: notifDuration,
                                        type: 'warning'
                                    });
                                } else {
                                    notifLimitReached.hide();
                                }

                                notifLimitReached.show();
                            });

                            editor.on('lessThanMinLimit', function () {
                                if (!minLimitReached) {
                                    minLimitReached = new CKEDITOR.plugins.notification(editor, {
                                        message: messageOnWordOrCharMinimum,
                                        duration: notifDuration,
                                        type: 'warning'
                                    });
                                } else {
                                    minLimitReached.hide();
                                }

                                minLimitReached.show();
                            });
                        }

                        ckeditorsInstance.push(editor);
                    }(editor));
                }
            });
        }
    });

    $(window).load(function(){
        //$('.preloader').addClass('active');
        //setTimeout(function(){
        //    $('.preloader').addClass('in');
        //},300);

        //var data,
        //    $imgLoad = $('.js-win-load');
        //for(var i = 0; i < $imgLoad.length; i++){
        //    data = $imgLoad.eq(i).attr('data-src');
        //    $imgLoad.eq(i).attr('src', data);
        //}

        var coordinatePointLat = $('#map').find('#map2').attr('data-coordinate-lat');
        var coordinatePointLong = $('#map').find('#map2').attr('data-coordinate-long');

        if ($('#map_canvas').length > 0) {
            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA_77j1uiQdQJZ3v3mAyU2rwQM7mhS6HRY", function (data, textStatus, jqxhr) {
                $.getScript("/assets/js/plugins/jquery.ui.map.min.js", function (data, textStatus, jqxhr) {
                    var mapVenue = (function () {
                        return {
                            init: function () {
                                var $canvas = $('#map_canvas');

                                if ($canvas.length > 0) {

                                    $canvas.gmap({// Change this to your desired latitude and longitude
                                        'center': new google.maps.LatLng(coordinatePointLat, coordinatePointLong),
                                        'zoom': 17,
                                        'scrollwheel': !1,
                                        'mapTypeControl': false,
                                        'navigationControl': false,
                                        'streetViewControl': false,
                                        'styles': [{
                                            stylers: [{
                                                gamma: 0.60
                                            }, {
                                                hue: "#9AC23B"
                                            }, {
                                                invert_lightness: false
                                            }, {
                                                lightness: 2
                                            }, {
                                                saturation: -20
                                            }, {
                                                visibility: "on"
                                            }]
                                        }]
                                    });

                                    var image = {
                                        url: '/./assets/images/pitch/pin.png', // Define the map marker file here
                                        // This marker is 51 pixels wide by 63 pixels tall.
                                        size: new google.maps.Size(67, 77),
                                        // The origin for this image is 0,0.
                                        origin: new google.maps.Point(0, 0),
                                        // The anchor for this image is the base of the flagpole at 26,63.
                                        anchor: new google.maps.Point(26, 63)
                                    };

                                    $canvas.gmap().bind('init', function () {

                                        google.maps.event.addListener($canvas.gmap('get', 'map'), 'click', function(event){
                                            this.setOptions({scrollwheel:true});
                                        });

                                        google.maps.event.addListener($canvas.gmap('get', 'map'), 'mouseout', function(event){
                                            this.setOptions({scrollwheel:false});
                                        });


                                        $canvas.gmap('addMarker', {
                                            'id': 'marker-1',
                                            'position': '1.2820849,103.8582107',
                                            'bounds': false,
                                            'icon': image
                                        }).click(function () {

                                            $canvas.gmap('openInfoWindow', {
                                                'content': '<h4>TECHINNOVATION 2017</h4><p><strong>Marina Bay Sands, Singapore</strong></p>'
                                            }, this);
                                        });
                                    });

                                    // end
                                }
                            }
                        }
                    }());

                    mapVenue.init();
                });
            });
        }


        var infocard = FXM.sameHeight('.information--card');

        var check;

        $(window).resize(function () {
            clearTimeout(check);
            check = setTimeout(function () {
                //item.calculate();
                infocard.calculate();
            }, 50);
        });

        var $customScroll = $(".js-custom-scrollbar");

        var initCustomScrollbar = function () {
            try {
                $(".js-custom-scrollbar").mCustomScrollbar('destroy');
            } catch(e) {}

            if ($(window).width() < 768) {
                $(".js-custom-scrollbar").mCustomScrollbar({
                    contentTouchScroll: true,
                    axis: 'x'
                });
            } else {
                $(".js-custom-scrollbar").mCustomScrollbar({
                    contentTouchScroll: true
                });
            }
        };

        var csTimers;

        $(window).resize(function () {
            clearTimeout(csTimers);
            csTimers = setTimeout(function () {
                if ($('.js-custom-scrollbar').length > 0){
                    initCustomScrollbar();
                }
            }, 150);
        });

        if ($('.js-custom-scrollbar').length > 0){
            initCustomScrollbar();
        }

    });


}(window, jQuery, FXM));
