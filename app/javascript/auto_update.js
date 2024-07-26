document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');
  

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          postsContainer.scrollTop = postsContainer.scrollHeight;
        }
      });
    });
  
    const observeLatestPost = () => {
      const latestPost = document.querySelector('#posts .post:last-child');
      if (latestPost) {
        observer.observe(latestPost);
      }
    };
  
    observeLatestPost();
  
    setInterval(() => {
      const latestMessageId = document.querySelector('#posts .post:last-child')?.dataset?.postId || 0;
      
      fetch(`/posts/auto_update?latest_id=${latestMessageId}`)
        .then(response => response.json())
        .then(data => {
          data.new_posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.dataset.postId = post.id;
            postElement.innerHTML = `<p>${post.content}</p>`;
            postsContainer.appendChild(postElement);
          });
          observeLatestPost();
        })
        .catch(error => console.error('Error:', error));
    }, 1000); 
  });
  