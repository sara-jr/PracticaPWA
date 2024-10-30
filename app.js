document.addEventListener('DOMContentLoaded', () => { 
    // Obtiene los elementos de la navegación 
    const homeLink = document.getElementById('home'); 
    const aboutLink = document.getElementById('about'); 
    const contactLink = document.getElementById('contact'); 
    const content = document.getElementById('content');
    // Define el contenido que se mostrará cuando se haga clic en los enlaces
    homeLink.addEventListener('click', () => { 
    content.innerHTML = '<p>Esta es la página de inicio.</p>';  }); 
    aboutLink.addEventListener('click', () => { 
    content.innerHTML = '<p>Esta es la página "Acerca de".</p>';  }); 
    contactLink.addEventListener('click', () => { 
    content.innerHTML = '<p>Esta es la página de contacto.</p>';  }); 

    window.onload = () =>{
        setTimeout(()=>{ // Esta parte es para simular que la aplicacion tomoa tiempo en cargar
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('home-screen').style.display = 'block';
        }, 5000);
    }
}); 

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('El service Worker ha sido registrado con éxito:',registration);
    }).catch(function(error) {
        console.log('Error en el registro del Service Worker:', error);
    });
}
else{
    console.log('El navegador no soporta los service workers');
}