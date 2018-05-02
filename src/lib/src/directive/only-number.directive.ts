import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

    @Input()
    onlyNumber: boolean;

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        let e = <KeyboardEvent> event;
        if (this.onlyNumber) {
            if ((e.key === '+' || e.keyCode === 107 || (e.shiftKey && e.keyCode === 187)) && (
                this.el.nativeElement.value.indexOf('+') > -1 ||
                this.el.nativeElement.value.length > 0
            )) {
                e.preventDefault();
                return;
            }

            if (
                [46, 8, 9, 27, 13, 110, 190, 171].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A|X|C|V, Command+A|X|C|V
                ([65, 88, 67, 86].indexOf(e.keyCode) !== -1 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40) ||
                // Allow plus button
                (e.key === '+' || e.keyCode === 107 || (e.shiftKey && e.keyCode === 187))) {
                // let it happen, don't do anything
                return;
            }

            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }

        } else {
            return;
        }
    }
}
