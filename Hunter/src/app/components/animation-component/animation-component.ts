import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector:'animation-component',
    templateUrl: 'animation-component.html',
    styleUrls: [ 'animation-component.css' ]
})

export class AnimationComponent{

    @ViewChild('panel') public panel: ElementRef;

    public animateParent(){
        
    }

    public scrollLeft(): void {        
        let count = 0, time = 50;
        while( count < 3000 ){
            count ++;
            time += 10;            
            setTimeout(() => {
                this.panel.nativeElement.scrollLeft -= 1;
            }, time);
        }
      }
    
      public scrollRight(): void {        
        let count = 0, time = 50;
        while( count < 3000 ){
            count ++;
            time += 10;
            setTimeout(() => {
                this.panel.nativeElement.scrollLeft += 1;
            }, time);
        }
      }
    
}