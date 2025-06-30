// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica para las Tarjetas Interactivas (Leer más) ---
    const interactiveCardBtns = document.querySelectorAll('.interactive-card-btn');
    interactiveCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const targetElement = document.getElementById(targetId);
            // Muestra u oculta el contenido detallado
            targetElement.classList.toggle('hidden');
            // Oculta el propio botón "Leer más"
            btn.classList.add('hidden');
        });
    });

    // --- Lógica para el Flujo del Proceso de Co-Creación ---
    const processData = [
        { id: 1, title: 'Convocatoria', description: 'Se inicia un diálogo con vecinos y organizaciones para identificar necesidades y formar un "colectivo" de trabajo diverso e inclusivo. Se establecen reglas de diálogo y prioridades conjuntas.' },
        { id: 2, title: 'Diagnóstico', description: 'Fase de investigación profunda ("sentipensante") que valora el conocimiento vivido. Se usan mapeos colectivos y entrevistas para entender cómo los diferentes grupos perciben y usan el espacio.' },
        { id: 3, title: 'Co-Diseño', description: 'Talleres creativos donde el colectivo, guiado por facilitadores, genera ideas espaciales usando maquetas y dibujos. La comunidad define el programa de usos y la "agenda" de actividades del parque.' },
        { id: 4, title: 'Evolución', description: 'Implementación de la obra, idealmente con participación comunitaria. Se evalúa el impacto post-ocupación y el colectivo evoluciona a un Comité Gestor permanente para guiar el futuro del parque.' }
    ];

    const stepsContainer = document.getElementById('process-steps');
    const contentContainer = document.getElementById('process-content');

    // Crea dinámicamente los elementos de los pasos del proceso
    processData.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'step flex flex-col items-center cursor-pointer px-4';
        stepEl.dataset.stepId = step.id;
        stepEl.innerHTML = `
            <div class="step-circle w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-xl transition-colors duration-300">${step.id}</div>
            <p class="step-text mt-2 text-sm font-medium text-stone-600 transition-colors duration-300">${step.title}</p>
        `;
        stepsContainer.appendChild(stepEl);

        // Agrega un conector visual entre los pasos
        if (index < processData.length - 1) {
            const connector = document.createElement('div');
            connector.className = 'step-connector mt-6 hidden sm:block';
            stepsContainer.appendChild(connector);
        }
    });

    const stepElements = document.querySelectorAll('.step');
    
    // Función para actualizar el contenido del proceso al hacer clic
    function updateProcessContent(stepId) {
        const step = processData.find(s => s.id == stepId);
        contentContainer.innerHTML = `
            <h4 class="text-xl font-bold text-deep-green">${step.title}</h4>
            <p class="mt-2 text-stone-600">${step.description}</p>
        `;
        stepElements.forEach(el => {
            el.classList.toggle('active', el.dataset.stepId == stepId);
        });
    }
    
    stepsContainer.addEventListener('click', (e) => {
        const stepEl = e.target.closest('.step');
        if (stepEl) {
            updateProcessContent(stepEl.dataset.stepId);
        }
    });

    // Carga el contenido del primer paso por defecto
    updateProcessContent(1);

    // --- Gráfico de Participación (Chart.js) ---
    const ctxParticipation = document.getElementById('participationChart').getContext('2d');
    new Chart(ctxParticipation, {
        type: 'bar',
        data: {
            labels: ['Información', 'Consulta', 'Delegación', 'Co-Gestión', 'Autogestión'],
            datasets: [{
                label: 'Nivel de Participación',
                data: [20, 40, 60, 80, 100],
                backgroundColor: [
                    '#E7E5E4', // stone-200
                    '#D6D3D1', // stone-300
                    '#A8A29E', // stone-400
                    '#FCD34D', // amber-300
                    '#B45309', // amber-700
                ],
                borderColor: '#78716C', // stone-500
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let level = context.label;
                            let description = '';
                            switch(level) {
                                case 'Información': description = 'Comunicación unidireccional.'; break;
                                case 'Consulta': description = 'Se pide opinión, sin poder de decisión.'; break;
                                case 'Delegación': description = 'Se cede poder sobre temas específicos.'; break;
                                case 'Co-Gestión': description = 'Decisiones conjuntas y colegiadas. (Meta Delphos)'; break;
                                case 'Autogestión': description = 'La comunidad adopta sus propias decisiones. (Meta Delphos)'; break;
                            }
                            return description;
                        }
                    }
                }
            },
            scales: {
                x: { display: false },
                y: { ticks: { font: { weight: 'bold' } } }
            }
        }
    });

    // --- Lógica para la sección de Socios ---
    const partners = [
        { id: 'muni', name: 'Municipalidad de San José', logo: '🏛️', goal: 'Rehabilitar áreas urbanas, fomentar el desarrollo social y reducir la inseguridad.', value: 'Delphos ofrece una herramienta de alto impacto para cumplir sus mandatos legales, mejorando la seguridad y la satisfacción ciudadana, y creando un proyecto legado para la administración.' },
        { id: 'ice', name: 'Instituto Costarricense de Electricidad (ICE)', logo: '💡', goal: 'Promover la eficiencia energética y modernizar la infraestructura.', value: 'El proyecto permite una reducción de hasta el 80% en costos de energía y mantenimiento del alumbrado. Sirve como un caso de estudio de "Ciudad Inteligente", fortaleciendo su imagen de innovación.' },
        { id: 'fifco', name: 'Florida Ice and Farm Company (FIFCO)', logo: '💧', goal: 'Inversión en comunidad y metas de sostenibilidad como "Agua Positiva" y "Cero Residuos".', value: 'El parque es una plataforma para sus programas de consumo responsable y voluntariado corporativo, ofreciendo un proyecto de alto impacto y visibilidad para su liderazgo en sostenibilidad.' },
        { id: 'bac', name: 'BAC Credomatic', logo: '💳', goal: 'Inversión social, educación financiera y financiamiento de impacto.', value: 'Delphos es un espacio para sus programas de educación financiera y apoyo a emprendedores. El Fideicomiso puede ser un vehículo para su inversión de impacto, posicionándolo como el banco de la comunidad.' },
        { id: 'intel', name: 'Intel Costa Rica', logo: '💻', goal: 'Educación STEM, voluntariado corporativo y metas ambientales.', value: 'Se puede crear un "Rincón STEAM" para talleres comunitarios. Ofrece oportunidades tangibles para su voluntariado y una demostración práctica de su compromiso ambiental y tecnológico.' },
        { id: 'comunidad', name: 'Comunidad', logo: '👥', goal: 'Recuperar y dignificar su espacio vital, tener voz y control sobre su entorno.', value: 'La comunidad no es un socio más, es el centro del proyecto. A través del diseño participativo y el Comité Gestor, se convierte en dueña de su espacio, asegurando que responda a sus necesidades y sueños.' },
    ];
    const partnersGrid = document.getElementById('partners-grid');
    const partnerDetailsContainer = document.getElementById('partner-details-container');
    
    // Crea dinámicamente la cuadrícula de logos de socios
    partners.forEach(partner => {
        const partnerEl = document.createElement('div');
        partnerEl.className = 'partner-logo p-4 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105';
        partnerEl.dataset.partnerId = partner.id;
        partnerEl.innerHTML = `
            <div class="text-4xl">${partner.logo}</div>
            <p class="mt-2 text-xs text-center font-semibold text-stone-600">${partner.name}</p>
        `;
        partnersGrid.appendChild(partnerEl);
    });
    
    let currentPartnerId = null;

    // Muestra u oculta los detalles del socio al hacer clic
    partnersGrid.addEventListener('click', (e) => {
        const partnerLogoEl = e.target.closest('.partner-logo');
        if(partnerLogoEl) {
            const partnerId = partnerLogoEl.dataset.partnerId;

            document.querySelectorAll('.partner-logo').forEach(el => el.classList.remove('ring-2', 'ring-terracotta'));
            partnerLogoEl.classList.add('ring-2', 'ring-terracotta');

            if(currentPartnerId === partnerId) {
                partnerDetailsContainer.innerHTML = '';
                currentPartnerId = null;
                partnerLogoEl.classList.remove('ring-2', 'ring-terracotta');
            } else {
                const partner = partners.find(p => p.id === partnerId);
                partnerDetailsContainer.innerHTML = `
                    <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-terracotta animate-fade-in">
                        <h4 class="text-xl font-bold text-deep-green">${partner.name}</h4>
                        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 class="font-semibold text-stone-500">Objetivo Estratégico</h5>
                                <p class="mt-1 text-stone-700">${partner.goal}</p>
                            </div>
                            <div>
                                <h5 class="font-semibold text-stone-500">Propuesta de Valor de Delphos</h5>
                                <p class="mt-1 text-stone-700">${partner.value}</p>
                            </div>
                        </div>
                    </div>
                `;
                currentPartnerId = partnerId;
            }
        }
    });

    // --- Gráfico de Gobernanza (Chart.js) ---
    const ctxGovernance = document.getElementById('governanceChart').getContext('2d');
    new Chart(ctxGovernance, {
        type: 'doughnut',
        data: {
            labels: ['Comunidad', 'Patrocinadores', 'Municipalidad', 'ONG Aliada'],
            datasets: [{
                label: 'Composición del Comité Técnico',
                data: [4, 2, 1, 1],
                backgroundColor: ['#B45309', '#A8A29E', '#78716C', '#4ADE80'],
                borderColor: '#F5F5F4',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: 'Composición Propuesta del Comité Técnico (9 Asientos)',
                    font: { size: 16 }
                }
            }
        }
    });

    // --- Lógica para el estado activo del link de navegación al hacer scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if(pageYOffset >= sectionTop - 70){
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            link.classList.add('inactive-nav');
            if(link.getAttribute('href').includes(currentSectionId)){
                link.classList.add('active-nav');
                link.classList.remove('inactive-nav');
            }
        });
    });

});
