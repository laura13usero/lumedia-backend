document.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que el DOM esté completamente cargado
  alert('DOM completamente cargado');
  
  const form = document.getElementById('upload-form');
  
  if (!form) {
    alert('⚠️ El formulario no existe o el ID está mal');
  } else {
    alert('✅ Formulario encontrado');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevenir el envío del formulario

    alert('Formulario enviado');
  });
});