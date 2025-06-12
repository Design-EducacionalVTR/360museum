// Sistema de Interação com as Obras de Arte

class InteractionManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.paintingsContainer = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        // Aguardar o A-Frame estar pronto
        document.addEventListener('DOMContentLoaded', () => {
            this.scene = document.querySelector('a-scene');
            this.camera = document.querySelector('#main-camera');
            this.paintingsContainer = document.querySelector('#paintings-container');
            
            if (this.scene) {
                this.scene.addEventListener('loaded', () => {
                    this.setupPaintings();
                    this.setupInteractionComponents();
                    this.isInitialized = true;
                });
            }
        });
    }

    setupPaintings() {
        const paintings = getAllPaintings();
        
        paintings.forEach(paintingId => {
            this.createPaintingEntity(paintingId);
        });
    }

    createPaintingEntity(paintingId) {
        const paintingData = getPaintingData(paintingId);
        const position = getPaintingPosition(paintingId);
        
        if (!paintingData || !position) return;

        // Container da obra
        const paintingContainer = document.createElement('a-entity');
        paintingContainer.setAttribute('id', `painting-${paintingId}`);
        paintingContainer.setAttribute('position', 
            `${position.position.x} ${position.position.y} ${position.position.z}`);
        paintingContainer.setAttribute('rotation', 
            `${position.rotation.x} ${position.rotation.y} ${position.rotation.z}`);

        // Moldura
        const frame = document.createElement('a-box');
        frame.setAttribute('width', position.scale.x + 0.2);
        frame.setAttribute('height', position.scale.y + 0.2);
        frame.setAttribute('depth', 0.09);
        frame.setAttribute('color', '#8B4513');
        frame.setAttribute('material', 'roughness: 0.8; metalness: 0.2');
        frame.setAttribute('position', '0 0 -0.05');
        paintingContainer.appendChild(frame);

        // Imagem da obra
        const painting = document.createElement('a-image');
        painting.setAttribute('src', `#${paintingData.imageId}`);
        painting.setAttribute('width', position.scale.x);
        painting.setAttribute('height', position.scale.y);
        painting.setAttribute('class', 'interactive painting');
        painting.setAttribute('data-painting-id', paintingId);
        painting.setAttribute('material', 'transparent: false');
        
        // Adicionar componente de interação
        painting.setAttribute('painting-interaction', '');
        
        paintingContainer.appendChild(painting);

        // Placa informativa
        const nameplate = this.createNameplate(paintingData);
        nameplate.setAttribute('position', `0 ${-position.scale.y/2 - 0.3} 0.01`);
        paintingContainer.appendChild(nameplate);

        // Indicador de interação
        const indicator = this.createInteractionIndicator();
        indicator.setAttribute('position', `${position.scale.x/2 + 0.2} ${position.scale.y/2 + 0.2} 0.1`);
        paintingContainer.appendChild(indicator);

        // Adicionar ao container
        this.paintingsContainer.appendChild(paintingContainer);
    }

    createNameplate(paintingData) {
        const nameplate = document.createElement('a-entity');
        
        // Fundo da placa
        const background = document.createElement('a-plane');
        background.setAttribute('width', '2');
        background.setAttribute('height', '0.3');
        background.setAttribute('color', '#2c3e50');
        background.setAttribute('material', 'opacity: 0.8; transparent: true');
        nameplate.appendChild(background);

        // Título
        const title = document.createElement('a-text');
        title.setAttribute('value', paintingData.title);
        title.setAttribute('position', '0 0.05 0.01');
        title.setAttribute('align', 'center');
        title.setAttribute('color', 'white');
        title.setAttribute('font', 'size: 0.15; weight: bold');
        nameplate.appendChild(title);

        // Artista
        const artist = document.createElement('a-text');
        artist.setAttribute('value', paintingData.artist);
        artist.setAttribute('position', '0 -0.05 0.01');
        artist.setAttribute('align', 'center');
        artist.setAttribute('color', '#ecf0f1');
        artist.setAttribute('font', 'size: 0.1');
        nameplate.appendChild(artist);

        return nameplate;
    }

    createInteractionIndicator() {
        const indicator = document.createElement('a-sphere');
        indicator.setAttribute('radius', '0.05');
        indicator.setAttribute('color', '#3498db');
        indicator.setAttribute('material', 'emissive: #3498db; emissiveIntensity: 0.3');
        indicator.setAttribute('animation', 
            'property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1000; loop: true; easing: easeInOutSine');
        indicator.setAttribute('class', 'interaction-indicator');
        
        return indicator;
    }

    setupInteractionComponents() {
        // Registrar componente de interação com pinturas
        AFRAME.registerComponent('painting-interaction', {
            init: function() {
                const el = this.el;
                const paintingId = el.getAttribute('data-painting-id');
                
                // Eventos de hover
                el.addEventListener('mouseenter', function() {
                    el.setAttribute('material', 'opacity: 0.8');
                    document.querySelector('#cursor').setAttribute('material', 'color: #3498db');
                });

                el.addEventListener('mouseleave', function() {
                    el.setAttribute('material', 'opacity: 1');
                    document.querySelector('#cursor').setAttribute('material', 'color: white');
                });

                // Evento de clique
                el.addEventListener('click', function() {
                    window.interactionManager.onPaintingClick(paintingId);
                });

                // Eventos para VR
                el.addEventListener('raycaster-intersected', function() {
                    el.setAttribute('material', 'opacity: 0.8');
                });

                el.addEventListener('raycaster-intersected-cleared', function() {
                    el.setAttribute('material', 'opacity: 1');
                });
            }
        });

        // Registrar componente de teleporte para VR
        AFRAME.registerComponent('teleport-controls', {
            schema: {
                cameraRig: {type: 'selector'},
                teleportOrigin: {type: 'selector'},
                button: {default: 'trigger'},
                collisionEntities: {default: '.floor'},
                landingMaxAngle: {default: 45},
                hitCylinderColor: {default: '#4CC3D9'},
                hitCylinderRadius: {default: 0.2},
                hitCylinderHeight: {default: 0.2}
            },
            
            init: function() {
                const el = this.el;
                const data = this.data;
                
                // Implementação básica do teleporte
                el.addEventListener(data.button + 'down', function() {
                    // Lógica de teleporte seria implementada aqui
                    console.log('Teleporte ativado');
                });
            }
        });

        // Registrar componente para seguir a câmera
        AFRAME.registerComponent('follow-camera', {
            tick: function() {
                if (!this.el.object3D || !this.el.object3D.visible) return;
                
                const camera = document.querySelector('#main-camera');
                if (!camera) return;
                
                const cameraPosition = camera.object3D.position;
                const cameraRotation = camera.object3D.rotation;
                
                // Posicionar elemento à frente da câmera
                const distance = 2;
                this.el.object3D.position.set(
                    cameraPosition.x + Math.sin(cameraRotation.y) * distance,
                    cameraPosition.y,
                    cameraPosition.z - Math.cos(cameraRotation.y) * distance
                );
                
                // Rotacionar para encarar a câmera
                this.el.object3D.lookAt(cameraPosition);
            }
        });
    }

    onPaintingClick(paintingId) {
        console.log(`Obra clicada: ${paintingId}`);
        
        // Reproduzir som de clique (se disponível)
        this.playClickSound();
        
        // Adicionar efeito visual
        this.addClickEffect(paintingId);
        
        // Mostrar informações da obra
        if (window.uiController) {
            window.uiController.showInfoPanel(paintingId);
        }
        
        // Analytics (se implementado)
        this.trackInteraction(paintingId);
    }

    playClickSound() {
        // Implementar reprodução de som se necessário
        // const audio = new Audio('assets/audio/click.mp3');
        // audio.play();
    }

    addClickEffect(paintingId) {
        const painting = document.querySelector(`[data-painting-id="${paintingId}"]`);
        if (!painting) return;

        // Efeito de pulso
        painting.setAttribute('animation__click', 
            'property: scale; to: 1.05 1.05 1.05; dur: 200; dir: alternate; loop: 1; easing: easeInOutQuad');
        
        // Remover animação após completar
        setTimeout(() => {
            painting.removeAttribute('animation__click');
        }, 400);
    }

    trackInteraction(paintingId) {
        // Implementar analytics se necessário
        console.log(`Interação registrada: ${paintingId} em ${new Date().toISOString()}`);
    }

    // Método para destacar uma obra específica
    highlightPainting(paintingId) {
        const painting = document.querySelector(`[data-painting-id="${paintingId}"]`);
        if (!painting) return;

        painting.setAttribute('material', 'emissive: #3498db; emissiveIntensity: 0.2');
        
        setTimeout(() => {
            painting.setAttribute('material', 'emissive: #000000; emissiveIntensity: 0');
        }, 2000);
    }

    // Método para obter obra mais próxima da câmera
    getNearestPainting() {
        if (!this.camera) return null;

        const cameraPosition = this.camera.object3D.position;
        let nearestPainting = null;
        let nearestDistance = Infinity;

        getAllPaintings().forEach(paintingId => {
            const position = getPaintingPosition(paintingId);
            if (!position) return;

            const distance = cameraPosition.distanceTo(
                new THREE.Vector3(position.position.x, position.position.y, position.position.z)
            );

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestPainting = paintingId;
            }
        });

        return nearestPainting;
    }

    // Método para tour automático
    startAutoTour() {
        const paintings = getAllPaintings();
        let currentIndex = 0;

        const showNextPainting = () => {
            if (currentIndex >= paintings.length) {
                currentIndex = 0;
            }

            const paintingId = paintings[currentIndex];
            this.highlightPainting(paintingId);
            
            setTimeout(() => {
                if (window.uiController) {
                    window.uiController.showInfoPanel(paintingId);
                }
            }, 1000);

            currentIndex++;
        };

        // Mostrar primeira obra
        showNextPainting();

        // Configurar intervalo para próximas obras
        return setInterval(showNextPainting, 10000); // 10 segundos por obra
    }
}

// Inicializar gerenciador de interação
window.interactionManager = new InteractionManager();

