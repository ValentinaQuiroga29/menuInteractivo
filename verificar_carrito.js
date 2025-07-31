// Script para verificar el funcionamiento del carrito
console.log('🔍 Verificando funcionamiento del carrito...');

// Verificar que el contexto del carrito esté disponible
if (typeof window !== 'undefined') {
  console.log('✅ Ventana disponible');
  
  // Verificar que React esté cargado
  if (window.React) {
    console.log('✅ React disponible');
  } else {
    console.log('❌ React no disponible');
  }
  
  // Verificar que Material-UI esté cargado
  if (window.Mui) {
    console.log('✅ Material-UI disponible');
  } else {
    console.log('❌ Material-UI no disponible');
  }
}

// Función para simular agregar al carrito
function simularAgregarAlCarrito() {
  console.log('🛒 Simulando agregar al carrito...');
  
  // Crear un platillo de prueba
  const platilloPrueba = {
    id_platillo: 1,
    nombre: 'Hamburguesa Clásica',
    precio: 12.99,
    descripcion: 'Hamburguesa con carne, lechuga, tomate y queso',
    imagen: 'hamburguesa.jpg'
  };
  
  console.log('📋 Platillo de prueba:', platilloPrueba);
  console.log('💡 Para probar el carrito:');
  console.log('   1. Ve al menú');
  console.log('   2. Haz clic en "Agregar" en cualquier platillo');
  console.log('   3. Verifica que aparezca el número en el carrito de la barra');
  console.log('   4. Haz clic en el carrito para ver los items');
}

// Ejecutar verificación
simularAgregarAlCarrito();

console.log('🎯 Instrucciones para probar:');
console.log('   1. Abre http://192.168.2.7:5173');
console.log('   2. Ve al menú');
console.log('   3. Agrega platillos al carrito');
console.log('   4. Verifica que el carrito muestre el número de items');
console.log('   5. Haz clic en el carrito para ver el contenido'); 