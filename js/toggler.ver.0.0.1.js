(function($) {
    //action selector, area to toggle
    function Toggler(handle, target, enforcePos) {

        var handler = $(handle);
        var area    = $(target);
        var shown   = false;
        var timer   = 20;
        var isActivated = false;

        var setupEvents = function () {
            handler.on('click', toggleTarget);
            handler.on('mouseleave', checkBoundaries);
            area.on('mouseleave', toggleTarget);
        };

        var checkBoundaries = function(e) {
            if (shown) {
                handler.off('mouseleave', checkBoundaries);
                setTimeout(function () {
                    //mouse
                    var mouseX = e.pageX;
                    var mouseY = e.pageY + 5;
                    //box
                    var offset = area.offset();
                    var areaX = offset.left;
                    var areaY = offset.top;
                    var areaH = area.height();
                    var areaW = area.width();

                    handler.on('mouseleave', checkBoundaries);
                    if (!((mouseX >= areaX) && (mouseX <= areaX + areaW)) || !((mouseY >= areaY) && (mouseY <= areaY + areaH))) {
                        toggleTarget();
                    }
                }, timer);
            }
        };
        var enforcePosition = function(enforcePos.relativeTo, enforcePos.offset, enforcePos.formula) {
            this.relativeTo = jQuery(enforcePos.relativeTo || 'body').first();
            this.handlerTopPos = this.relativeTo.offset().top;
            this.formula = enforcePos.formula || this.handlerTopPos - area.height();
            this.offset = enforcePos.offset || this.formula;
            area.css(
                {
                    top:this.offset+'px'
                }
            );
        };
        var toggleTarget = function (e) {
            if (typeof e != 'undefined') {
                if (e.type == 'mouseleave' && !shown)
                    return;
            }
            typeof enforcePos !== 'undefined' : enforcePosition(enforcePos) : console.log('No positioning info given');
            area.stop().toggle();
            shown = !shown;
            return false;
        };
        this.isActive = function() {
            return isActivated;
        }    
        this.init = function () {
            setupEvents();
            isActivated = true;
        };
    
    }

    new Toggler('handler selector', 'box selector').init();
}(jQuery))
