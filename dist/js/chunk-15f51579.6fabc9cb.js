(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15f51579"],{"2a24":function(e,t,a){"use strict";a("4b34")},"4b34":function(e,t,a){},e234:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",[a("validation-observer",{ref:"infoRules",attrs:{tag:"form"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.invalid;return[a("b-row",[a("b-col",{attrs:{md:"6"}},[a("validation-provider",{attrs:{name:"Name (En)",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-group",{attrs:{label:"Name (En)","label-for":"name"}},[a("b-form-input",{attrs:{id:"name",autofocus:"",state:e.getValidationState(t),trim:"",placeholder:"Name (En)"},model:{value:e.categoryForm.en_name,callback:function(t){e.$set(e.categoryForm,"en_name",t)},expression:"categoryForm.en_name"}}),a("b-form-invalid-feedback",[e._v(" "+e._s(t.errors[0])+" ")])],1)]}}],null,!0)})],1),a("b-col",{attrs:{md:"6"}},[a("validation-provider",{attrs:{name:"Name (Ar)",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("b-form-group",{attrs:{label:"Name (Ar)","label-for":"name"}},[a("b-form-input",{attrs:{id:"name",autofocus:"",state:e.getValidationState(t),trim:"",placeholder:"Name (Ar)"},model:{value:e.categoryForm.ar_name,callback:function(t){e.$set(e.categoryForm,"ar_name",t)},expression:"categoryForm.ar_name"}}),a("b-form-invalid-feedback",[e._v(" "+e._s(t.errors[0])+" ")])],1)]}}],null,!0)})],1),a("b-col",{attrs:{cols:"6"}},[a("b-media",{staticClass:"mb-1",attrs:{"no-body":""}},[a("b-media-aside",[a("b-link",[a("b-img",{directives:[{name:"img",rawName:"v-img"}],ref:"previewEl",attrs:{rounded:"",src:e.categoryForm.image,height:"100",width:"100"}})],1)],1),a("b-media-body",[a("b-button",{staticClass:"mb-75 mr-75",attrs:{variant:"primary",size:"sm"},on:{click:function(t){return e.selectImg()}}},[e._v(" Upload Image ")]),a("b-form-file",{ref:"refImg",attrs:{accept:".jpg, .png, .jpeg",hidden:!0,plain:""},on:{change:function(t){return e.changeImage(t)}}})],1)],1)],1)],1),a("b-row",[a("b-col",{staticClass:"mt-50",attrs:{cols:"12"}},[!e.loader&&e.$route.params.id?a("b-button",{staticClass:"mr-1",attrs:{variant:"primary",disabled:r||Object.values(e.errors).length>0},on:{click:function(t){return e.addcategory()}}},[e._v(" Save Changes ")]):e._e(),e.loader||e.$route.params.id?e._e():a("b-button",{staticClass:"mr-1",attrs:{variant:"primary",disabled:r||Object.values(e.errors).length>0},on:{click:function(t){return e.addcategory()}}},[e._v(" Add ")]),e.loader?a("b-button",{staticClass:"mr-1",attrs:{variant:"primary",disabled:""}},[a("b-spinner",{attrs:{small:"",type:"grow"}}),e._v(" Loading... ")],1):e._e()],1)],1)]}}])})],1)},o=[],n=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("a6f4")),i=a("47bc"),s=a("8f03"),c=a("bc3a"),l=a.n(c),m=a("223c"),d=(a("2ef0"),{data:function(){return{required:s["b"],id:this.$store.state.generalIds.id,loader:!1,file:"",image:"",en_image:"",errors:{}}},setup:function(){var e=Object(i["a"])(),t=e.getValidationState,a=Object(n["ref"])({image:null}),r=Object(n["ref"])("");return{getValidationState:t,categoryForm:a,file:r}},mounted:function(){this.showCategory()},methods:{selectImg:function(){this.$refs.refImg.$el.click()},changeImage:function(e){var t=this;this.image=e.target.files[0];var a=e.target,r=new Image;r.src=window.URL.createObjectURL(e.target.files[0]),r.onload=function(){if(a.files){var e=new FileReader;e.onload=function(e){t.categoryForm.image=e.target.result},t.image=a.files[0],e.readAsDataURL(a.files[0])}}},showCategory:function(){var e=this;return!!this.$route.params.id&&(l.a.get("admin/categories/".concat(this.$route.params.id)).then((function(t){e.categoryForm=t.data.data[0]})),!0)},addcategory:function(){var e=this;if(this.$route.params.id){this.loader=!0;var t=new FormData;for(var a in this.categoryForm)"image"!==a&&(t.append(a,this.categoryForm[a]),console.log(a,this.categoryForm[a]));t.delete("image"),t.delete("features"),t.delete("created_at"),this.image&&t.append("image",this.image),l.a.post("admin/categories/".concat(this.$route.params.id),t).then((function(t){200!==t.status&&201!==t.status||(e.$router.push({name:"categories"}),e.$toasted.show("Updated Successfully",{name:"top-center",duration:3e3}))})).finally((function(){e.loader=!1}))}else{var r=new FormData;for(var o in this.categoryForm)"image"!==o&&(r.append(o,this.categoryForm[o]),console.log(o,this.categoryForm[o]));r.delete("image"),this.image&&r.append("image",this.image),this.loader=!0,l.a.post("admin/categories",r).then((function(t){200!==t.status&&201!==t.status||(e.$router.push({name:"categories"}),e.$toasted.show("Created Successfully",{name:"top-center",duration:3e3}))})).catch((function(t){500===t.response.status&&e.$toast({component:m["a"],props:{link:"Somthing Went Wrong",icon:"BellIcon",variant:"error"}})})).finally((function(){e.loader=!1}))}}}}),u=d,g=(a("2a24"),a("2877")),f=Object(g["a"])(u,r,o,!1,null,null,null);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-15f51579.6fabc9cb.js.map