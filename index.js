document.addEventListener("DOMContentLoaded", () => {

    let url = "https://fetch-message-in-the-bottle.herokuapp.com/api/v2/gifs";
    let url2 = "http://fetch-message-in-the-bottle.herokuapp.com/api/v2/users"
    const my_id = 1;

    let form = document.getElementById("new-gif-form");
    loadImages();

    form.addEventListener("submit", function(e){
        e.preventDefault();
        submitImage(document.getElementById("new-gif-input").value);
        this.reset();
        loadImage();
    });

    document.addEventListener("click", function(e){
        if (e.target.getAttribute("data-user-id") === "1"){
            deleteImage(e.target.getAttribute("data-gif-id"), e.target);
        }
    })

    function loadImages(){
        fetch(url).then( r => r.json()).then( d => {
            d.forEach( item => {
                let img = document.createElement("img");
                img.src = item.url;
                img.setAttribute("data-user-id", item.user_id);
                img.setAttribute("data-gif-id", item.id);
                document.getElementById("gifs-container").appendChild(img);
            })
        })
    }

    function loadImage(){
        fetch(url).then( r => r.json()).then( d => {
                let img = document.createElement("img");
                img.src = d[0].url;
                img.setAttribute("data-user-id", d[0].user_id);
                img.setAttribute("data-gif-id", d[0].id);
                document.getElementById("gifs-container").prepend(img);
            })
    }

    function submitImage(gifURL){
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({user_id: 1, url: gifURL}),
            headers: {'Content-Type': 'application/json'}
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ));
    }

    function deleteImage(id, target){
        fetch(url+ '/' + id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ))
        .then( () => target.remove() );
    }

})