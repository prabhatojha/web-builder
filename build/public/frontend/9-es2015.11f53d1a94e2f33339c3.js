(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BJHQ:function(t,n,e){"use strict";e.r(n),e.d(n,"UsersModule",(function(){return T}));var o=e("ofXK"),i=e("tyNb"),r=e("lAwo"),c=e("fXoL");let s=(()=>{class t{constructor(){this.APP_ROUTES=r.a}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=c.Ib({type:t,selectors:[["app-forgot-password"]],decls:16,vars:1,consts:[[1,"login-content"],[1,"email-login-container"],[1,"email-login-content"],[1,"mt-3"],[1,"mt-2"],["type","text","placeholder","Email","required","",1,"form-control"],["type","submit",1,"btn","btn-light","submit-button"],[3,"routerLink"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Tb(2,"div",2),c.Tb(3,"h4"),c.Bc(4,"Reset your password"),c.Sb(),c.Tb(5,"p"),c.Bc(6,"An email will be sent you with a reset password link, which will be valid for 10 min."),c.Sb(),c.Tb(7,"div",3),c.Tb(8,"div",4),c.Pb(9,"input",5),c.Sb(),c.Tb(10,"div",3),c.Tb(11,"button",6),c.Bc(12,"Reset"),c.Sb(),c.Sb(),c.Sb(),c.Tb(13,"div",3),c.Tb(14,"a",7),c.Bc(15,"Remember password? Login here"),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.Bb(14),c.kc("routerLink",n.APP_ROUTES.LOGIN))},directives:[i.d],styles:[".toolbar-icon-size[_ngcontent-%COMP%]{width:32px;line-height:32px;height:32px}.login-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.938rem}.login-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .login-content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:.813rem}.login-content[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{width:100%;justify-content:center}"]}),t})();var a=e("3Pt+"),b=e("3E0/"),l=e("cwDw"),p=e("bch+"),u=e("zScf");class d{constructor(t,n,e){this.name=t&&t.trim(),this.email=n&&n.trim().toLowerCase(),this.password=e&&e.trim()}}let g=(()=>{class t{constructor(t){this.httpService=t}signup(t){return this.httpService.post(p.a.USER_SIGNUP,t,{})}login(t){return this.httpService.post(p.a.USER_LOGIN,t,{})}}return t.\u0275fac=function(n){return new(n||t)(c.Xb(u.a))},t.\u0275prov=c.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),m=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=c.Ib({type:t,selectors:[["app-easy-login"]],inputs:{type:"type"},decls:7,vars:2,consts:[[1,"easy-login"],[1,"mt-3"],["type","button",1,"btn","btn-light"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Tb(2,"button",2),c.Bc(3),c.Sb(),c.Sb(),c.Tb(4,"div",1),c.Tb(5,"button",2),c.Bc(6),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.Bb(3),c.Dc("",n.type," with Google"),c.Bb(3),c.Dc("",n.type," with Facebook"))},styles:[".easy-login[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;justify-content:center}"]}),t})();var h=e("Zn22");let S=(()=>{class t{constructor(t){this.userService=t,this.APP_ROUTES=r.a,this.userForm=new a.d({email:new a.b("",[a.o.required,a.o.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$")]),password:new a.b("",[a.o.required,a.o.minLength(6),a.o.maxLength(20)])})}ngOnInit(){}onSubmit(t){t.preventDefault(),this.isLoading=!0;const n=this.userForm.controls,e=new d(null,n.email.value,n.password.value);this.userService.login(e).pipe(Object(b.a)(3e3)).subscribe(t=>{this.isLoading=!1},t=>{this.isLoading=!1})}}return t.\u0275fac=function(n){return new(n||t)(c.Ob(g))},t.\u0275cmp=c.Ib({type:t,selectors:[["app-login"]],decls:22,vars:7,consts:[[1,"login-content"],[1,"easy-login-container"],[3,"type"],[1,"email-login-container"],[1,"email-login-content"],[1,"mt-3"],[3,"formGroup","ngSubmit"],[1,"mt-2"],["formControlName","email","type","text","placeholder","Email","required","",1,"form-control"],["formControlName","password","type","password","placeholder","Password",1,"form-control"],[3,"routerLink"],["loadingTitle","Logging in...","title","Login",3,"loading","disabled"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Pb(2,"app-easy-login",2),c.Sb(),c.Pb(3,"hr"),c.Tb(4,"div",3),c.Tb(5,"div",4),c.Tb(6,"p"),c.Bc(7,"Login with email"),c.Sb(),c.Tb(8,"div",5),c.Tb(9,"form",6),c.bc("ngSubmit",(function(t){return n.onSubmit(t)})),c.Tb(10,"div",7),c.Pb(11,"input",8),c.Sb(),c.Tb(12,"div",5),c.Pb(13,"input",9),c.Sb(),c.Tb(14,"div"),c.Tb(15,"a",10),c.Bc(16,"Fortgot your password?"),c.Sb(),c.Sb(),c.Tb(17,"div",5),c.Pb(18,"app-dp-button",11),c.Sb(),c.Sb(),c.Sb(),c.Tb(19,"div",5),c.Tb(20,"a",10),c.Bc(21,"New here? Sign Up"),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.kc("@ScaleInOut",void 0),c.Bb(2),c.kc("type","Login"),c.Bb(7),c.kc("formGroup",n.userForm),c.Bb(6),c.kc("routerLink",n.APP_ROUTES.FORGOT_PASSWORD),c.Bb(3),c.kc("loading",n.isLoading)("disabled",null==n.userForm?null:n.userForm.invalid),c.Bb(2),c.kc("routerLink",n.APP_ROUTES.SIGNUP))},directives:[m,a.p,a.i,a.e,a.a,a.h,a.c,a.n,i.d,h.a],styles:[".toolbar-icon-size[_ngcontent-%COMP%]{width:32px;line-height:32px;height:32px}.login-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.938rem}.login-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .login-content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:.813rem}.login-content[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{width:100%;justify-content:center}"],data:{animation:[l.a.ScaleInOut]}}),t})(),P=(()=>{class t{constructor(){this.APP_ROUTES=r.a}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=c.Ib({type:t,selectors:[["app-reset-forgot-password"]],decls:13,vars:0,consts:[[1,"login-content"],[1,"email-login-container"],[1,"email-login-content"],[1,"mt-3"],[1,"mt-2"],["type","password","placeholder","Password","required","",1,"form-control"],["type","password","placeholder","Confirm Password","required","",1,"form-control"],["type","submit",1,"btn","btn-light","submit-button"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Tb(2,"div",2),c.Tb(3,"h4"),c.Bc(4,"Reset your password"),c.Sb(),c.Tb(5,"div",3),c.Tb(6,"div",4),c.Pb(7,"input",5),c.Sb(),c.Tb(8,"div",3),c.Pb(9,"input",6),c.Sb(),c.Tb(10,"div",3),c.Tb(11,"button",7),c.Bc(12,"Set new password"),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb())},styles:[".toolbar-icon-size[_ngcontent-%COMP%]{width:32px;line-height:32px;height:32px}.login-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.938rem}.login-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .login-content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:.813rem}.login-content[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{width:100%;justify-content:center}"]}),t})(),f=(()=>{class t{constructor(t){this.userService=t,this.APP_ROUTES=r.a,this.userForm=new a.d({name:new a.b("",[a.o.required,a.o.max(30)]),email:new a.b("",[a.o.required,a.o.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$")]),password:new a.b("",[a.o.required,a.o.minLength(6),a.o.maxLength(20)])})}ngOnInit(){}onSubmit(t,n){t.preventDefault(),this.isLoading=!0;const e=this.userForm.controls,o=new d(e.name.value,e.email.value,e.password.value);this.userService.signup(o).pipe(Object(b.a)(3e3)).subscribe(t=>{this.isLoading=!1},t=>{this.isLoading=!1})}}return t.\u0275fac=function(n){return new(n||t)(c.Ob(g))},t.\u0275cmp=c.Ib({type:t,selectors:[["app-signup"]],decls:21,vars:6,consts:[[1,"login-content"],[1,"easy-login-container"],[3,"type"],[1,"email-login-container"],[1,"email-login-content"],[1,"description"],[1,"mt-3"],[3,"formGroup","ngSubmit"],["type","text","formControlName","name","placeholder","Full name",1,"form-control"],["type","email","formControlName","email","placeholder","Email",1,"form-control"],["type","password","formControlName","password","placeholder","Password (6 to 20 characters)",1,"form-control"],["title","Create an account","loadingTitle","Creating...",3,"disabled","loading"],[1,"mt-3","mb-5"],[3,"routerLink"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Tb(1,"div",1),c.Pb(2,"app-easy-login",2),c.Sb(),c.Pb(3,"hr"),c.Tb(4,"div",3),c.Tb(5,"div",4),c.Tb(6,"p",5),c.Bc(7,"Create an account with email"),c.Sb(),c.Tb(8,"div",6),c.Tb(9,"form",7),c.bc("ngSubmit",(function(t){return n.onSubmit(t,n.userForm)})),c.Tb(10,"div"),c.Pb(11,"input",8),c.Sb(),c.Tb(12,"div",6),c.Pb(13,"input",9),c.Sb(),c.Tb(14,"div",6),c.Pb(15,"input",10),c.Sb(),c.Tb(16,"div",6),c.Pb(17,"app-dp-button",11),c.Sb(),c.Sb(),c.Sb(),c.Tb(18,"div",12),c.Tb(19,"a",13),c.Bc(20,"Already have an account? Login"),c.Sb(),c.Sb(),c.Sb(),c.Sb(),c.Sb()),2&t&&(c.kc("@ScaleInOut",void 0),c.Bb(2),c.kc("type","Sign Up"),c.Bb(7),c.kc("formGroup",n.userForm),c.Bb(8),c.kc("disabled",null==n.userForm?null:n.userForm.invalid)("loading",n.isLoading),c.Bb(2),c.kc("routerLink",n.APP_ROUTES.LOGIN))},directives:[m,a.p,a.i,a.e,a.a,a.h,a.c,h.a,i.d],styles:[".toolbar-icon-size[_ngcontent-%COMP%]{width:32px;line-height:32px;height:32px}.login-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{font-size:.938rem}.login-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .login-content[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{font-size:.813rem}.login-content[_ngcontent-%COMP%]   .submit-button[_ngcontent-%COMP%]{width:100%;justify-content:center}"],data:{animation:[l.a.ScaleInOut]}}),t})();const v=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=c.Ib({type:t,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"user-page"],[1,"user-page-left"],[1,"user-page-right"],[1,"user-page-content"]],template:function(t,n){1&t&&(c.Tb(0,"div",0),c.Pb(1,"div",1),c.Tb(2,"div",2),c.Tb(3,"div",3),c.Pb(4,"router-outlet"),c.Sb(),c.Sb(),c.Sb())},directives:[i.f],styles:[".toolbar-icon-size[_ngcontent-%COMP%]{width:32px;line-height:32px;height:32px}.user-page[_ngcontent-%COMP%]{display:flex;min-height:100vh}.user-page[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:50%;display:flex;justify-content:center}.user-page[_ngcontent-%COMP%]   .user-page-left[_ngcontent-%COMP%]{background-color:#333a41}.user-page[_ngcontent-%COMP%]   .user-page-content[_ngcontent-%COMP%]{margin-top:6rem;width:300px}"],data:{animation:[l.a.ScaleInOut]}}),t})(),children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",component:S},{path:"signup",component:f},{path:"reset",component:s},{path:"reset/confirm",component:P}]}];let O=(()=>{class t{}return t.\u0275mod=c.Mb({type:t}),t.\u0275inj=c.Lb({factory:function(n){return new(n||t)},imports:[[i.e.forChild(v)],i.e]}),t})();var w=e("FpXt");let T=(()=>{class t{}return t.\u0275mod=c.Mb({type:t}),t.\u0275inj=c.Lb({factory:function(n){return new(n||t)},imports:[[o.c,a.f,a.m,O,w.a]]}),t})()}}]);