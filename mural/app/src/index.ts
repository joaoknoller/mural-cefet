import ControladoraAviso from './controller/controladora-aviso';
const controladora = new ControladoraAviso();

window.addEventListener('load', async () => {
	controladora.iniciar();
});
