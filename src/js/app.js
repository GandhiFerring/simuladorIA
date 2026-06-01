// --- 1. CONFIGURACIÓN DE GEMINI ---
const GEMINI_API_KEY = "AIzaSyD57V425fDhoW2xcRdnGfBNPpuq1W0-FL0";

// El System Prompt define la personalidad
const instruccionesSistema = `
        Eres la Dra. Adriana, una exigente médica especialista en un hospital de la Ciudad de México. Estás en una visita médica con un representante de ventas de Ferring Pharmaceuticals. 

        Tu actitud: Tienes la agenda llena, eres directa y escéptica. Exiges evidencia clínica sólida antes de recetar cualquier cosa y pides casos de uso o da un cuadro clínico.

        Medicamentos de Ferring que te pueden presentar y tu postura ante ellos:
        - Rekovelle (folitropina delta) o Merapur (menotropina): Sabes que son para fertilidad y reproducción asistida. Tu objeción principal es el alto costo para las pacientes mexicanas y quieres saber si realmente mejora la tasa de nacimientos vivos frente a la competencia.
        - Minirin (desmopresina): Sabes que es para enuresis o diabetes insípida. Tu objeción principal son los efectos secundarios (riesgo de hiponatremia) y la adherencia al tratamiento en niños.
        - Glypressin (terlipresina): Sabes que es para el sangrado de várices esofágicas. Tu objeción principal es el perfil de seguridad cardiovascular y si justifica el precio para los presupuestos del hospital.

        Reglas estrictas para tus respuestas:
        1. Responde SIEMPRE en español de México, usando jerga médica de forma natural.
        2. NUNCA uses viñetas, asteriscos, negritas ni caracteres especiales, ya que tu respuesta será leída por un sistema automático de texto-a-voz. Escribe en texto plano.
        3. Sé extremadamente breve: máximo 1 oraciones por turno. Corta el rollo y ve al grano.`;
// Historial de la conversación para que no pierda el hilo
let historialConversacion = [];

// Elementos del DOM
const btnHablar = document.getElementById('btn-hablar');
const txtUsuario = document.getElementById('texto-usuario');
const txtBot = document.getElementById('texto-bot');

// --- 2. CONFIGURACIÓN DE AUDIO NATIVO ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const reconocimiento = new SpeechRecognition();
reconocimiento.lang = 'es-MX';
reconocimiento.continuous = true;
reconocimiento.interimResults = true;
let temporizadorSilencio; //

const hablar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-MX';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
};

// --- 3. LÓGICA DE INTERACCIÓN ---
// 3.1 Activamos hablar
btnHablar.addEventListener('click', () => {
    reconocimiento.start();
    btnHablar.innerText = "Escuchando...";
    btnHablar.classList.replace('bg-green-300', 'bg-rose-600');
});

reconocimiento.onresult = (event) => {
    clearTimeout(temporizadorSilencio); //inicializamos contador
    textoEscuchado = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        textoEscuchado += event.results[i][0].transcript;
    }

    // Mostramos en pantalla lo que va diciendo en tiempo real
    txtUsuario.innerText = `${textoEscuchado}`;

    temporizadorSilencio = setTimeout(async () => {
        reconocimiento.stop(); //cerramos el microfono
        console.log(textoEscuchado);

        //lógica de procesamiento para la IA
        btnHablar.innerText = "Pensando...";
        btnHablar.classList.replace('bg-rose-600', 'bg-amber-500');
        // Añadimos lo que dijo el usuario al historial (formato Gemini)
        historialConversacion.push({
            role: "user",
            parts: [{ text: textoEscuchado }]
        });

        try {
            // 1. Actualizamos el modelo a la versión vigente (gemini-2.5-flash)
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

            const respuesta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: instruccionesSistema }]
                    },
                    contents: historialConversacion,
                    generationConfig: {
                        temperature: 0.7
                    }
                })
            });

            const data = await respuesta.json();

            // 2. Validamos si Google nos regresó un error antes de intentar leer los datos
            if (!respuesta.ok) {
                throw new Error(data.error?.message || "Error en el servidor de Google");
            }

            // Extraer el texto de la respuesta de Gemini
            const textoBot = data.candidates[0].content.parts[0].text;

            // Añadimos la respuesta de la doctora al historial (rol "model")
            historialConversacion.push({
                role: "model",
                parts: [{ text: textoBot }]
            });

            // Mostrar en pantalla y hablar
            txtBot.innerText = textoBot;
            hablar(textoBot);

        } catch (error) {
            console.error("Error en Gemini API:", error);
            txtBot.innerText = "Hubo un error de conexión con la Dra. Adriana.";
        }

        // Restaurar botón
        btnHablar.innerText = "Presiona y Habla";
        btnHablar.classList.replace('bg-amber-500', 'bg-green-300');

    }, 2000);
};

reconocimiento.onerror = (event) => {
    console.error("Error de micrófono:", event.error);
    btnHablar.innerText = "No te escuché - Intenta de nuevo";
    btnHablar.classList.replace('bg-rose-600', 'bg-indigo-600');
};