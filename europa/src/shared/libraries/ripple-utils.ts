export class RippleUtils {
    public cleanUp;
    public rippleContainer;
    public ripples;

    cleanUpRipple() {
        while (this.rippleContainer.firstChild) {
            this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }
    };

    debounce(func, delay) {
        var inDebounce;
        inDebounce = undefined;
        return function () {
            var args, context;
            context = this;
            args = arguments;
            clearTimeout(inDebounce);
            return inDebounce = setTimeout(function () {
                return func.apply(context, args);
            }, delay);
        };
    };

    showRipple(event) {
        var pos, ripple, rippler, size, style, x, y;
        ripple = this;
        rippler = document.createElement('span');
        size = ripple.offsetWidth;
        pos = ripple.getBoundingClientRect();
        x = event.pageX - pos.left - (size / 2);
        y = event.pageY - pos.top - (size / 2);
        style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
        ripple.rippleContainer.appendChild(rippler);
        return rippler.setAttribute('style', style);
    };

    initRippleEffect() {
        this.ripples = document.querySelectorAll('[ripple]');

        for (let i = 0, len = this.ripples.length; i < len; i++) {
            const ripple = this.ripples[i];
            this.rippleContainer = document.createElement('div');
            this.rippleContainer.className = 'ripple-container';
            ripple.addEventListener('mousedown', this.showRipple);
            ripple.addEventListener('mouseup', this.debounce(this.cleanUpRipple, 2000));
            ripple.rippleContainer = this.rippleContainer;
            ripple.appendChild(this.rippleContainer);
        }
    }
}