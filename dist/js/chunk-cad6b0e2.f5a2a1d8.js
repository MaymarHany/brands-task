(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cad6b0e2"],{"056d":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-card",[e("validation-observer",{ref:"infoRules",attrs:{tag:"form"}},[e("b-row",[e("b-col",{attrs:{md:"6"}},[e("validation-provider",{attrs:{name:"Name",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("b-form-group",{attrs:{label:"Name","label-for":"name"}},[e("b-form-input",{attrs:{id:"name",autofocus:"",state:t.getValidationState(a),trim:"",placeholder:"Name"},model:{value:t.testimonialForm.name,callback:function(a){t.$set(t.testimonialForm,"name",a)},expression:"testimonialForm.name"}}),e("b-form-invalid-feedback",[t._v(" "+t._s(a.errors[0])+" ")])],1)]}}])})],1),e("b-col",{attrs:{md:"6"}},[e("validation-provider",{attrs:{name:"Position",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("b-form-group",{attrs:{label:"Position","label-for":"position"}},[e("b-form-input",{attrs:{id:"position",autofocus:"",state:t.getValidationState(a),trim:"",placeholder:"Position"},model:{value:t.testimonialForm.position,callback:function(a){t.$set(t.testimonialForm,"position",a)},expression:"testimonialForm.position"}}),e("b-form-invalid-feedback",[t._v(" "+t._s(a.errors[0])+" ")])],1)]}}])})],1),e("b-col",{attrs:{md:"6"}},[e("validation-provider",{attrs:{rules:"required",name:"Content"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("b-form-group",{attrs:{label:"Content","label-for":"Content"}},[e("b-form-textarea",{attrs:{id:"Content",trim:"",type:"text",placeholder:"Content",state:t.getValidationState(a)},model:{value:t.testimonialForm.content,callback:function(a){t.$set(t.testimonialForm,"content",a)},expression:"testimonialForm.content"}}),e("b-form-invalid-feedback",[t._v(" "+t._s(a.errors[0])+" ")])],1)]}}])})],1),e("b-col",{attrs:{cols:"6"}},[e("b-media",{staticClass:"mb-1",attrs:{"no-body":""}},[e("b-media-aside",[e("b-link",[e("b-img",{directives:[{name:"img",rawName:"v-img"}],ref:"previewEl",attrs:{rounded:"",src:t.testimonialForm.avatar,height:"100",width:"100"}})],1)],1),e("b-media-body",[e("b-button",{staticClass:"mb-75 mr-75",attrs:{variant:"primary",size:"sm"},on:{click:function(a){return t.selectImg()}}},[t._v(" Upload Image ")]),e("b-form-file",{ref:"refImg",attrs:{accept:".jpg, .png, .jpeg",hidden:!0,plain:""},on:{change:function(a){return t.changeImage(a)}}})],1)],1)],1),t.errorMsg?e("b-col",{attrs:{cols:"12"}},[e("p",{staticClass:"text-danger"},[t._v(" "+t._s(t.errorMsg)+" ")])]):t._e()],1),e("b-row",[e("b-col",{staticClass:"mt-50",attrs:{cols:"12"}},[!t.loader&&t.$route.params.id?e("b-button",{staticClass:"mr-1",attrs:{variant:"primary"},on:{click:function(a){return t.addTestimonial()}}},[t._v(" Save Changes ")]):t._e(),t.loader||t.$route.params.id?t._e():e("b-button",{staticClass:"mr-1",attrs:{variant:"primary"},on:{click:function(a){return t.addTestimonial()}}},[t._v(" Add ")]),t.loader?e("b-button",{staticClass:"mr-1",attrs:{variant:"primary",disabled:""}},[e("b-spinner",{attrs:{small:"",type:"grow"}}),t._v(" Loading... ")],1):t._e()],1)],1)],1)],1)},o=[],i=(e("d3b7"),e("3ca3"),e("ddb0"),e("2b3d"),e("a6f4")),n=e("47bc"),s=e("8f03"),l=e("bc3a"),c=e.n(l),m=e("223c"),d=(e("2ef0"),{data:function(){return{required:s["b"],id:this.$store.state.generalIds.id,loader:!1,file:"",avatar:"",en_image:"",errorMsg:""}},setup:function(){var t=Object(n["a"])(),a=t.getValidationState,e=Object(i["ref"])({avatar:null}),r=Object(i["ref"])("");return{getValidationState:a,testimonialForm:e,file:r}},mounted:function(){this.showTestimonial()},methods:{selectImg:function(){this.$refs.refImg.$el.click()},changeImage:function(t){var a=this;this.avatar=t.target.files[0];var e=t.target,r=new Image;r.src=window.URL.createObjectURL(t.target.files[0]),r.onload=function(){if(e.files){var t=new FileReader;t.onload=function(t){a.testimonialForm.avatar=t.target.result},a.avatar=e.files[0],t.readAsDataURL(e.files[0])}}},showTestimonial:function(){var t=this;return!!this.$route.params.id&&(c.a.get("admin/testimonials/".concat(this.$route.params.id)).then((function(a){t.testimonialForm=a.data.data})),!0)},addTestimonial:function(){var t=this;if(this.$route.params.id){this.loader=!0;var a=new FormData;for(var e in this.testimonialForm)"avatar"!==e&&(a.append(e,this.testimonialForm[e]),console.log(e,this.testimonialForm[e]));a.delete("avatar"),this.avatar&&a.append("avatar",this.avatar),c.a.post("admin/testimonials/".concat(this.$route.params.id),a).then((function(a){200===a.status&&(t.$router.push({name:"testimonials"}),t.$toasted.show("Updated Successfully",{position:"top-center",duration:3e3}))})).catch((function(a){500===a.response.status?t.$toast({component:m["a"],props:{title:"Ooops!!! An Unexpected Internal server error",icon:"BellIcon",variant:"danger"}}):400===a.response.status&&(t.errorMsg=a.response.data.error)})).finally((function(){t.loader=!1}))}else{var r=new FormData;for(var o in this.testimonialForm)"avatar"!==o&&(r.append(o,this.testimonialForm[o]),console.log(o,this.testimonialForm[o]));r.delete("avatar"),this.avatar&&r.append("avatar",this.avatar),this.loader=!0,c.a.post("admin/testimonials",r).then((function(a){200!==a.status&&201!==a.status||(t.$router.push({name:"testimonials"}),t.$toasted.show("Created Successfully",{position:"top-center",duration:3e3}))})).catch((function(a){500===a.response.status?t.$toast({component:m["a"],props:{title:"Ooops!!! An Unexpected Internal server error",icon:"BellIcon",variant:"danger"}}):400===a.response.status&&(t.errorMsg=a.response.data.error)})).finally((function(){t.loader=!1}))}}}}),u=d,f=(e("38b1"),e("2877")),p=Object(f["a"])(u,r,o,!1,null,null,null);a["default"]=p.exports},"38b1":function(t,a,e){"use strict";e("76c1")},"76c1":function(t,a,e){}}]);
//# sourceMappingURL=chunk-cad6b0e2.f5a2a1d8.js.map