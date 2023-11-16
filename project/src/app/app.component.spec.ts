import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: AppComponent;


  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should have a title', () => {
    expect(fixture.title).toEqual('RSLUP Project');
  });

})
//   it(`should have as title 'project'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('project');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('project app is running!');
//   });
// });
