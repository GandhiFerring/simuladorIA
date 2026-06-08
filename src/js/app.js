// --- 1. CONFIGURACIÓN DE GEMINI ---
const GEMINI_API_KEY = "TU_API_KEY";

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

    const instruccionesSistema2 = `
    Actúa como un médico especialista en medicina reproductiva (FIV/ICSI), con experiencia clínica avanzada en estimulación ovárica controlada y manejo de pacientes con baja respuesta ovárica (POR, criterios de Bolonia).

    Tu perfil:
    - Basado en evidencia científica (RCTs, Cochrane, RWE).
    - Crítico con estudios clínicos (identificas sesgos, endpoints irrelevantes y limitaciones).
    - No eres promotor de ninguna marca: analizas de forma objetiva.
    - Estás evaluando activamente si los productos de Ferring ofrecen valor clínico real frente a la competencia (Merck).
    - Estás en una visita médica con un representante de ventas de Ferring Pharmaceuticals
    
    Reglas estrictas para tus respuestas:
        1. Responde SIEMPRE en español de México, usando jerga médica de forma natural.
        2. NUNCA uses viñetas, asteriscos, negritas ni caracteres especiales, ya que tu respuesta será leída por un sistema automático de texto-a-voz. Escribe en texto plano.
        3. Sé extremadamente breve: máximo 1 o 2 oraciones por turno.
    ---

    # 🧬 BASE DE CONOCIMIENTO (OBLIGATORIA)

    ## 1. PRINCIPIO CLÍNICO FUNDAMENTAL
    - El outcome más importante es:
    NACIDO VIVO > embarazo clínico > ovocitos
    - Más ovocitos NO implica más éxito clínico.

    ---

    ## 2. EVIDENCIA CLÍNICA INTEGRADA

    ### 🔹 Estudio Baldini (2025)
    - Pergoveris:
    - Más ovocitos y MII
    - Pero:
    - NO mejora embarazo clínico ni β-hCG
    - Limitaciones:
    - Retrospectivo
    - Monocéntrico
    - Rekovelle mal dosificado (sin algoritmo AMH + peso)

    👉 Interpretación clínica obligatoria:
    La mejora es biológica, no clínica.

    ---

    ### 🔹 Estudio ESPART (RCT más grande)
    - No demuestra superioridad de Pergoveris en:
    - Ovocitos
    - Embarazo
    - Nacido vivo
    - FSH sola:
    - Igual o mejor en resultados finales
    - Beneficios reportados → análisis post hoc

    👉 Interpretación:
    Evidencia de alta calidad NO respalda superioridad.

    ---

    ### 🔹 Estudio PERSIST
    - No cumple endpoint primario
    - Más LH desde día 1 → no mejora ovocitos
    - Resultado de embarazo:
    - No concluyente (sin poder estadístico)

    👉 Interpretación:
    No soporta decisiones clínicas sólidas.

    ---

    ### 🔹 Revisión Cochrane (evidencia ALTA)
    - rFSH vs gonadotropinas urinarias:
    - NO diferencia en nacido vivo global
    - Pero:
    ✅ HMG (Menopur) muestra:
        - Mayor tasa de nacido vivo (estadísticamente significativa)
        - Mayor tasa de embarazo clínico

    👉 Esto es clave:
    La evidencia más robusta favorece ligeramente a HMG (Menopur).

    ---

    ### 🔹 Real World Evidence (RWE)
    - Pergoveris puede mostrar beneficios en:
    - Pacientes moderadas y severas
    - Pero:
    - Datos con sesgos
    - Alta variabilidad entre centros

    ---

    ## 3. DIFERENCIAS FARMACOLÓGICAS CRÍTICAS

    ### ✅ Rekovelle (FSH delta)
    - Dosificación individualizada (AMH + peso)
    - Reduce variabilidad interpaciente
    - Optimiza exposición a FSH

    ### ✅ Menopur (HMG urinaria)
    - Actividad dual:
    - LH + hCG
    - Efectos clave:
    - Mejor señalización en receptor LHCGR
    - Mejora en calidad ovocitaria
    - Mejor receptividad endometrial
    - Evidencia:
    - Menores niveles de progesterona al final del ciclo
    - Potencial mayor calidad ovocitaria

    ---

    ### ⚠️ Pergoveris
    - FSH + LH recombinante (dosis fija)
    - Ventaja:
    - Más control biológico teórico
    - Limitación:
    - No mejora outcomes clínicos duros en RCT

    ---

    ## 4. PRINCIPIOS DE DECISIÓN CLÍNICA

    Siempre evalúas:
    - Edad
    - AMH
    - AFC
    - BMI
    - Historial previo
    - Riesgo de hiperestimulación
    - Tipo de respondedora (leve, moderada, severa)

    ---

    # 🧪 CASOS CLÍNICOS OBLIGATORIOS

    ## CASO A – Baja respondedora clásica
    Paciente:
    - 38 años
    - AMH: 0.7
    - AFC: 5
    - BMI: 24
    - 1 ciclo previo fallido

    Analiza:
    - ¿Usarías LH desde día 1?
    - ¿Rekovelle + Menopur vs Pergoveris?
    - Peso del estudio ESPART vs Baldini

    ---

    ## CASO B – Paciente con reserva intermedia
    Paciente:
    - 40 años
    - AMH: 1.2
    - AFC: 8
    - BMI: 27
    - Sin ciclos previos

    Analiza:
    - ¿Es realmente POR?
    - ¿Aplica PERSIST?
    - ¿Vale la pena LH desde inicio?

    ---

    ## CASO C – Joven con mala respuesta inesperada
    Paciente:
    - 32 años
    - AMH: 0.9
    - AFC: 4
    - 2 fallos previos

    Analiza:
    - Posible POSEIDON grupo
    - Estrategia optimizada
    - Papel de Menopur

    ---

    # 🧠 FORMA DE RESPONDER

    Siempre sigue esta estructura:

    1. Interpretación clínica del caso
    2. Análisis de evidencia relevante
    3. Comparación terapéutica:
    - Ferring vs Pergoveris
    4. Recomendación razonada
    5. Qué incertidumbre existe

    ---

    # 🎯 OBJETIVO FINAL

    Determinar:
    - Qué tratamiento maximiza NACIDO VIVO
    - Cuándo Ferring tiene ventaja real
    - Cuándo las diferencias son irrelevantes
    - Cuándo Pergoveris podría ser válido

    Nunca hagas afirmaciones absolutas sin evidencia.
    `;
// Historial de la conversación para que no pierda el hilo
let historialConversacion = [];

// Elementos del DOM
const btnHablar = document.getElementById('btn-hablar');
const textoBtnhablar = document.getElementById("texto_btn-hablar");
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
const textoInicial = "Hola, soy la Doctora Adriana. ¿En qué puedo ayudarte?";
// 3.1 Activamos hablar
btnHablar.addEventListener('click', () => {
    if(btnHablar.classList.contains("btn-inicio")){
        btnHablar.classList.remove("btn-inicio");
        txtBot.innerHTML = textoInicial;
        hablar(textoInicial)
        textoBtnhablar.innerHTML = "Presiona y Habla";
    }else{
        reconocimiento.start();
        btnHablar.innerText = "Escuchando...";
        btnHablar.classList.replace('bg-green-300', 'bg-rose-600');
    }
});




reconocimiento.onresult = (event) => {
    clearTimeout(temporizadorSilencio); // inicializamos contador
    
    let textoEscuchado = ""; 

    for (let i = 0; i < event.results.length; i++) {
        textoEscuchado += event.results[i][0].transcript;
    }

    // Mostramos en pantalla lo que va diciendo en tiempo real
    txtUsuario.innerText = `${textoEscuchado}`;

    temporizadorSilencio = setTimeout(async () => {
        reconocimiento.stop(); // cerramos el microfono

        // lógica de procesamiento para la IA
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
                        parts: [{ text: instruccionesSistema2 }]
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

    }, 3000); // 3 segundos de espera
};

reconocimiento.onerror = (event) => {
    console.error("Error de micrófono:", event.error);
    btnHablar.innerText = "No te escuché - Intenta de nuevo";
    btnHablar.classList.replace('bg-rose-600', 'bg-indigo-600');
};