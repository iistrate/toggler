(function($) {
    //action selector, area to toggle
    function Toggler(handle, target) {

        var handler = $(handle);
        var area    = $(target);
        var shown   = false;
        var timer   = 20;

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

        var toggleTarget = function (e) {
            if (typeof e != 'undefined') {
                if (e.type == 'mouseleave' && !shown)
                    return;
            }
            area.stop().toggle();
            shown = !shown;
            return false;
        };

        this.init = function () {
            setupEvents();
        };
    }

    new Toggler('handler selector', 'box selector').init();
}(jQuery))