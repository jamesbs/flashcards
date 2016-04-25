import { describe, it, expect, injectAsync, TestComponentBuilder, ComponentFixture } from 'angular2/testing';
import { Flashcard } from "./flashcard";

describe('flashcard test', () => {
    it('default name', injectAsync([TestComponentBuilder], (builder: TestComponentBuilder) => {
        builder.createAsync(Flashcard)
            .then((fixture: ComponentFixture) => {
                const component: Flashcard = fixture.componentInstance;
                
                expect(component.getName()).toBe('flash');
            });
    }));
});
