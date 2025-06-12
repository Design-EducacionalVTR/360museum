// Controlador de Interface do Usuário

class UIController {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.instructionsPanel = document.getElementById('instructions-panel');
        this.infoPanel = document.getElementById('info-panel');
        this.startButton = document.getElementById('start-experience');
        this.closeInfoButton = document.getElementById('close-info');
        this.paintingInfoContainer = document.getElementById('painting-info');
        
        this.isVRMode = false;
        this.currentPainting = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkVRSupport();
    }

    bindEvents() {
        // Botão de iniciar experiência
        this.startButton.addEventListener('click', () => {
            this.startExperience();
        });

        // Botão de fechar informações
        this.closeInfoButton.addEventListener('click', () => {
            this.hideInfoPanel();
        });

        // Detectar entrada/saída do modo VR
        document.querySelector('a-scene').addEventListener('enter-vr', () => {
            this.isVRMode = true;
            this.onEnterVR();
        });

        document.querySelector('a-scene').addEventListener('exit-vr', () => {
            this.isVRMode = false;
            this.onExitVR();
        });

        // Fechar painel com ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideInfoPanel();
            }
        });
    }

    checkVRSupport() {
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                if (supported) {
                    console.log('VR suportado');
                } else {
                    console.log('VR não suportado');
                }
            });
        }
    }

    startExperience() {
        // Ocultar tela de carregamento e instruções
        this.loadingScreen.classList.add('hidden');
        this.instructionsPanel.classList.add('hidden');
        
        // Pequeno delay para suavizar a transição
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.instructionsPanel.style.display = 'none';
        }, 500);
    }

    showInfoPanel(paintingId) {
        const paintingData = getPaintingData(paintingId);
        if (!paintingData) return;

        this.currentPainting = paintingId;

        if (this.isVRMode) {
            this.showVRInfoPanel(paintingData);
        } else {
            this.showWebInfoPanel(paintingData);
        }
    }

    showWebInfoPanel(paintingData) {
        // Criar conteúdo HTML para o painel
        const infoHTML = `
            <h3>${paintingData.title}</h3>
            <p class="artist">${paintingData.artist}</p>
            <p class="year">${paintingData.year} - ${paintingData.period}</p>
            
            <div class="description">
                <h4>Descrição</h4>
                <p>${paintingData.description}</p>
            </div>

            <div class="historical-context">
                <h4>Contexto Histórico</h4>
                <p>${paintingData.historicalContext}</p>
            </div>

            <div class="technical-info">
                <h4>Informações Técnicas</h4>
                <p><strong>Técnica:</strong> ${paintingData.technique}</p>
                <p><strong>Dimensões:</strong> ${paintingData.dimensions}</p>
                <p><strong>Localização:</strong> ${paintingData.location}</p>
            </div>

            <div class="curiosities">
                <h4>Curiosidades</h4>
                <ul>
                    ${paintingData.curiosities.map(curiosity => `<li>${curiosity}</li>`).join('')}
                </ul>
            </div>

            <div class="significance">
                <h4>Significado</h4>
                <p>${paintingData.significance}</p>
            </div>
        `;

        this.paintingInfoContainer.innerHTML = infoHTML;
        this.infoPanel.classList.remove('hidden');
        this.infoPanel.classList.add('show');
    }

    showVRInfoPanel(paintingData) {
        // Remover painel VR existente se houver
        const existingPanel = document.querySelector('#vr-info-panel');
        if (existingPanel) {
            existingPanel.parentNode.removeChild(existingPanel);
        }

        // Criar painel informativo em VR
        const vrPanel = document.createElement('a-entity');
        vrPanel.setAttribute('id', 'vr-info-panel');
        vrPanel.setAttribute('position', '0 2 -2');
        vrPanel.setAttribute('look-at', '#main-camera');

        // Fundo do painel
        const background = document.createElement('a-plane');
        background.setAttribute('width', '3');
        background.setAttribute('height', '2');
        background.setAttribute('color', '#ffffff');
        background.setAttribute('opacity', '0.9');
        background.setAttribute('material', 'transparent: true');
        vrPanel.appendChild(background);

        // Título
        const title = document.createElement('a-text');
        title.setAttribute('value', paintingData.title);
        title.setAttribute('position', '0 0.7 0.01');
        title.setAttribute('align', 'center');
        title.setAttribute('color', '#2c3e50');
        title.setAttribute('font', 'size: 0.2; weight: bold');
        vrPanel.appendChild(title);

        // Artista
        const artist = document.createElement('a-text');
        artist.setAttribute('value', paintingData.artist);
        artist.setAttribute('position', '0 0.4 0.01');
        artist.setAttribute('align', 'center');
        artist.setAttribute('color', '#7f8c8d');
        artist.setAttribute('font', 'size: 0.15');
        vrPanel.appendChild(artist);

        // Ano
        const year = document.createElement('a-text');
        year.setAttribute('value', `${paintingData.year} - ${paintingData.period}`);
        year.setAttribute('position', '0 0.2 0.01');
        year.setAttribute('align', 'center');
        year.setAttribute('color', '#34495e');
        year.setAttribute('font', 'size: 0.12');
        vrPanel.appendChild(year);

        // Descrição (resumida para VR)
        const description = document.createElement('a-text');
        const shortDescription = paintingData.description.substring(0, 200) + '...';
        description.setAttribute('value', shortDescription);
        description.setAttribute('position', '0 -0.2 0.01');
        description.setAttribute('align', 'center');
        description.setAttribute('color', '#333333');
        description.setAttribute('font', 'size: 0.1');
        description.setAttribute('width', '6');
        vrPanel.appendChild(description);

        // Botão de fechar
        const closeButton = document.createElement('a-cylinder');
        closeButton.setAttribute('position', '1.3 0.7 0.02');
        closeButton.setAttribute('radius', '0.1');
        closeButton.setAttribute('height', '0.05');
        closeButton.setAttribute('color', '#ff4757');
        closeButton.setAttribute('class', 'interactive');
        closeButton.addEventListener('click', () => {
            this.hideVRInfoPanel();
        });
        vrPanel.appendChild(closeButton);

        // X no botão de fechar
        const closeX = document.createElement('a-text');
        closeX.setAttribute('value', 'X');
        closeX.setAttribute('position', '1.3 0.7 0.03');
        closeX.setAttribute('align', 'center');
        closeX.setAttribute('color', 'white');
        closeX.setAttribute('font', 'size: 0.15; weight: bold');
        vrPanel.appendChild(closeX);

        // Adicionar à cena
        document.querySelector('a-scene').appendChild(vrPanel);
    }

    hideInfoPanel() {
        if (this.isVRMode) {
            this.hideVRInfoPanel();
        } else {
            this.infoPanel.classList.add('hidden');
            this.infoPanel.classList.remove('show');
        }
        this.currentPainting = null;
    }

    hideVRInfoPanel() {
        const vrPanel = document.querySelector('#vr-info-panel');
        if (vrPanel) {
            vrPanel.parentNode.removeChild(vrPanel);
        }
    }

    onEnterVR() {
        // Ocultar elementos de UI web
        this.infoPanel.classList.add('hidden');
        this.instructionsPanel.classList.add('hidden');
        
        console.log('Modo VR ativado');
    }

    onExitVR() {
        // Remover painéis VR
        this.hideVRInfoPanel();
        
        console.log('Modo VR desativado');
    }

    showLoadingScreen() {
        this.loadingScreen.classList.remove('hidden');
        this.loadingScreen.style.display = 'flex';
    }

    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }

    showInstructions() {
        this.instructionsPanel.classList.remove('hidden');
    }

    // Método para atualizar o progresso de carregamento
    updateLoadingProgress(percentage) {
        const loadingText = this.loadingScreen.querySelector('p');
        if (loadingText) {
            loadingText.textContent = `Carregando... ${percentage}%`;
        }
    }

    // Método para mostrar mensagens de erro
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h3>Erro</h3>
                <p>${message}</p>
                <button onclick="location.reload()">Recarregar</button>
            </div>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            color: white;
            text-align: center;
        `;
        document.body.appendChild(errorDiv);
    }
}

// Inicializar controlador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.uiController = new UIController();
});

