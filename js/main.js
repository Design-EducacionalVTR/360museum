// Script principal do Museu Virtual 360°

class MuseumApp {
    constructor() {
        this.scene = null;
        this.isLoaded = false;
        this.loadingProgress = 0;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        
        this.init();
    }

    init() {
        console.log('Inicializando Museu Virtual 360°...');
        
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupScene();
            });
        } else {
            this.setupScene();
        }
    }

    setupScene() {
        this.scene = document.querySelector('a-scene');
        
        if (!this.scene) {
            console.error('Cena A-Frame não encontrada');
            return;
        }

        // Configurar eventos da cena
        this.scene.addEventListener('loaded', () => {
            this.onSceneLoaded();
        });

        // Monitorar carregamento de assets
        this.setupAssetLoading();
        
        // Configurar controles
        this.setupControls();
        
        // Configurar iluminação dinâmica
        this.setupLighting();
        
        // Configurar ambiente responsivo
        this.setupResponsiveEnvironment();
    }

    setupAssetLoading() {
        const assets = document.querySelector('a-assets');
        if (!assets) return;

        const images = assets.querySelectorAll('img');
        this.totalAssets = images.length;

        images.forEach((img, index) => {
            img.addEventListener('load', () => {
                this.loadedAssets++;
                this.updateLoadingProgress();
            });

            img.addEventListener('error', (e) => {
                console.error(`Erro ao carregar imagem: ${img.src}`, e);
                this.loadedAssets++;
                this.updateLoadingProgress();
            });
        });
    }

    updateLoadingProgress() {
        if (this.totalAssets === 0) return;

        this.loadingProgress = Math.round((this.loadedAssets / this.totalAssets) * 100);
        
        if (window.uiController) {
            window.uiController.updateLoadingProgress(this.loadingProgress);
        }

        if (this.loadingProgress >= 100) {
            this.onAssetsLoaded();
        }
    }

    onAssetsLoaded() {
        console.log('Todos os assets foram carregados');
        
        // Pequeno delay para garantir que tudo esteja pronto
        setTimeout(() => {
            if (window.uiController) {
                window.uiController.hideLoadingScreen();
                window.uiController.showInstructions();
            }
        }, 1000);
    }

    onSceneLoaded() {
        console.log('Cena A-Frame carregada');
        this.isLoaded = true;
        
        // Configurar otimizações de performance
        this.optimizePerformance();
        
        // Configurar eventos de redimensionamento
        this.setupResizeHandling();
    }

    setupControls() {
        const camera = document.querySelector('#main-camera');
        if (!camera) return;

        // Configurar controles de mouse/touch
        camera.setAttribute('look-controls', {
            enabled: true,
            magicWindowTrackingEnabled: true,
            touchEnabled: true,
            mouseEnabled: true
        });

        // Configurar controles de movimento
        camera.setAttribute('wasd-controls', {
            enabled: true,
            acceleration: 65,
            fly: false
        });

        // Configurar cursor
        const cursor = document.querySelector('#cursor');
        if (cursor) {
            cursor.setAttribute('raycaster', {
                objects: '.interactive',
                far: 20,
                interval: 100
            });
        }
    }

    setupLighting() {
        // Configurar iluminação dinâmica baseada na hora do dia
        const currentHour = new Date().getHours();
        let ambientIntensity, directionalIntensity, lightColor;

        if (currentHour >= 6 && currentHour < 18) {
            // Dia
            ambientIntensity = 0.4;
            directionalIntensity = 0.6;
            lightColor = '#ffffff';
        } else {
            // Noite
            ambientIntensity = 0.2;
            directionalIntensity = 0.4;
            lightColor = '#fff8dc';
        }

        const ambientLight = document.querySelector('a-light[type="ambient"]');
        const directionalLight = document.querySelector('a-light[type="directional"]');

        if (ambientLight) {
            ambientLight.setAttribute('intensity', ambientIntensity);
        }

        if (directionalLight) {
            directionalLight.setAttribute('intensity', directionalIntensity);
            directionalLight.setAttribute('color', lightColor);
        }
    }

    setupResponsiveEnvironment() {
        // Ajustar ambiente baseado no tamanho da tela
        const isMobile = window.innerWidth <= 768;
        const environment = document.querySelector('#museum-environment');

        if (environment && isMobile) {
            // Simplificar ambiente para dispositivos móveis
            environment.setAttribute('environment', {
                preset: 'forest',
                groundColor: '#445',
                grid: 'none',
                dressing: 'none'
            });
        }
    }

    optimizePerformance() {
        // Configurar otimizações baseadas no dispositivo
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency <= 2;

        if (isMobile || isLowEnd) {
            // Reduzir qualidade para dispositivos menos potentes
            this.scene.setAttribute('renderer', {
                antialias: false,
                colorManagement: false,
                physicallyCorrectLights: false
            });

            // Reduzir resolução de sombras
            this.scene.setAttribute('shadow', {
                enabled: false
            });
        }
    }

    setupResizeHandling() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.onWindowResize();
            }, 250);
        });
    }

    onWindowResize() {
        // Reconfigurar ambiente responsivo
        this.setupResponsiveEnvironment();
        
        // Ajustar UI se necessário
        if (window.uiController) {
            // Lógica de redimensionamento da UI
        }
    }

    // Método para alternar entre diferentes ambientes
    changeEnvironment(preset) {
        const environment = document.querySelector('#museum-environment');
        if (!environment) return;

        const presets = {
            museum: {
                preset: 'none',
                groundColor: '#8B7355',
                grid: 'none'
            },
            gallery: {
                preset: 'default',
                groundColor: '#ffffff',
                grid: 'cross'
            },
            outdoor: {
                preset: 'forest',
                groundColor: '#445',
                grid: 'cross'
            }
        };

        if (presets[preset]) {
            environment.setAttribute('environment', presets[preset]);
        }
    }

    // Método para alternar qualidade gráfica
    toggleQuality() {
        const renderer = this.scene.getAttribute('renderer') || {};
        const newAntialias = !renderer.antialias;

        this.scene.setAttribute('renderer', {
            antialias: newAntialias,
            colorManagement: newAntialias,
            physicallyCorrectLights: newAntialias
        });

        console.log(`Qualidade gráfica ${newAntialias ? 'alta' : 'baixa'} ativada`);
    }

    // Método para capturar screenshot
    takeScreenshot() {
        if (!this.scene) return;

        const canvas = this.scene.canvas;
        if (!canvas) return;

        // Criar link de download
        const link = document.createElement('a');
        link.download = `museu-virtual-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }

    // Método para obter estatísticas de performance
    getPerformanceStats() {
        if (!this.scene || !this.scene.renderer) return null;

        const renderer = this.scene.renderer;
        const info = renderer.info;

        return {
            fps: this.scene.time ? Math.round(1000 / this.scene.time) : 0,
            triangles: info.render.triangles,
            calls: info.render.calls,
            memory: info.memory
        };
    }

    // Método para modo debug
    toggleDebugMode() {
        const debugEnabled = this.scene.getAttribute('debug') || false;
        this.scene.setAttribute('debug', !debugEnabled);
        
        if (!debugEnabled) {
            console.log('Modo debug ativado');
            console.log('Performance:', this.getPerformanceStats());
        }
    }

    // Método para reiniciar a experiência
    restart() {
        // Resetar posição da câmera
        const cameraRig = document.querySelector('#camera-rig');
        if (cameraRig) {
            cameraRig.setAttribute('position', '0 1.6 3');
            cameraRig.setAttribute('rotation', '0 0 0');
        }

        // Fechar painéis abertos
        if (window.uiController) {
            window.uiController.hideInfoPanel();
        }

        // Resetar interações
        if (window.interactionManager) {
            // Lógica de reset se necessário
        }

        console.log('Experiência reiniciada');
    }

    // Método para modo tela cheia
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Erro ao entrar em tela cheia:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Inicializar aplicação
window.museumApp = new MuseumApp();

// Atalhos de teclado
document.addEventListener('keydown', (event) => {
    if (!window.museumApp) return;

    switch(event.key) {
        case 'f':
        case 'F':
            window.museumApp.toggleFullscreen();
            break;
        case 'q':
        case 'Q':
            window.museumApp.toggleQuality();
            break;
        case 'r':
        case 'R':
            window.museumApp.restart();
            break;
        case 's':
        case 'S':
            if (event.ctrlKey) {
                event.preventDefault();
                window.museumApp.takeScreenshot();
            }
            break;
        case 'd':
        case 'D':
            if (event.ctrlKey) {
                event.preventDefault();
                window.museumApp.toggleDebugMode();
            }
            break;
    }
});

// Tratamento de erros globais
window.addEventListener('error', (event) => {
    console.error('Erro na aplicação:', event.error);
    
    if (window.uiController) {
        window.uiController.showError('Ocorreu um erro inesperado. Tente recarregar a página.');
    }
});

// Log de inicialização
console.log('Museu Virtual 360° - Versão 1.0');
console.log('Atalhos disponíveis:');
console.log('F - Tela cheia');
console.log('Q - Alternar qualidade');
console.log('R - Reiniciar');
console.log('Ctrl+S - Screenshot');
console.log('Ctrl+D - Debug');

