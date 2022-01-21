{
    let createPost=function(){
        let newPostForm= $('#new-post-form');
   
        newPostForm.submit(function(e){
           e.preventDefault();
   
           $.ajax({
               type:'post',
               url:'/posts/create',
               data: newPostForm.serialize(),
               success: function(data){
                   console.log(data);
                   let newPost=createNewPostDom(data.data.post);
                   $('#post-list-container').prepend(newPost);
                //    deletePost($('.delete-post-button',newPost));
               },
               error: function(err){
                   console.log(error.resposeText);
               }
           });
        });
   }

   let createNewPostDom= function(post){
       return $(`  <li id="post-${post._id}">
                            

           <small>
               <a href="/posts/destroy/${post._id}" class="delete-post-button">X</a>
           </small>

   
       ${ post.content}
       <span>--by ${ post.user.name}</span>
   

   
       <form action="/comments/create" method="POST">
           <input type="text" name="content" placeholder="Type Comment..">
           <input type="hidden" name="post" value="${post._id } ">
           <input type="submit" value="Add Comment">
       </form>


  

   <div>
       
       
   </div>
</li>`);
   }


//    let deletePost=function(deletelink){
//        $(deletelink).click(function(e){
//            e.preventDefault();

//            $.ajax({
//                type:'get',
//                url:$(deletelink).prop('href'),
//                success:function(data){
//                    $(`#post-${data.data.post_id}`).remove();
//                },
//                error: function(error){
//                    console.log(error.resposeText);
//                }
//            })
//        })
//    }
   createPost();
}
