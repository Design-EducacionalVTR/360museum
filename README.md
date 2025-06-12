# Museu Virtual 360° - Experiência Interativa Educacional

Uma experiência imersiva de museu virtual que permite aos usuários explorar obras de arte famosas em um ambiente 360° interativo, compatível com navegadores web e dispositivos de realidade virtual.

## 🎨 Características

- **Experiência 360°**: Ambiente imersivo de museu virtual
- **Obras Famosas**: Coleção de pinturas icônicas em alta resolução
- **Interatividade**: Clique nas obras para obter informações detalhadas
- **Compatibilidade VR**: Suporte completo para dispositivos de realidade virtual
- **Responsivo**: Funciona em desktop, tablet e dispositivos móveis
- **Educacional**: Informações históricas, curiosidades e contexto de cada obra

## 🖼️ Obras Incluídas

1. **Mona Lisa** - Leonardo da Vinci (1503-1519)
2. **A Noite Estrelada** - Vincent van Gogh (1889)
3. **O Grito** - Edvard Munch (1893)
4. **Os Girassóis** - Vincent van Gogh (1888)
5. **Guernica** - Pablo Picasso (1937)

## 🚀 Como Usar

### Navegador Web
1. Abra o arquivo `index.html` em um navegador moderno
2. Clique em "Iniciar Experiência"
3. Use o mouse para olhar ao redor
4. Clique nas obras de arte para obter informações
5. Use as teclas WASD para se mover (opcional)

### Realidade Virtual
1. Conecte seu headset VR
2. Abra a experiência no navegador
3. Clique no ícone de VR no canto inferior direito
4. Use os controladores para apontar e selecionar obras
5. Use o sistema de teleporte para se mover

## ⌨️ Atalhos de Teclado

- **F**: Alternar tela cheia
- **Q**: Alternar qualidade gráfica
- **R**: Reiniciar experiência
- **Ctrl+S**: Capturar screenshot
- **Ctrl+D**: Modo debug
- **ESC**: Fechar painéis informativos

## 🛠️ Tecnologias Utilizadas

- **A-Frame**: Framework WebVR/WebXR
- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilização e animações
- **JavaScript ES6+**: Lógica da aplicação
- **WebGL**: Renderização 3D
- **WebXR**: Suporte a realidade virtual

## 📁 Estrutura do Projeto

```
projeto-museu-virtual/
├── assets/
│   ├── images/
│   │   ├── paintings/     # Imagens das obras de arte
│   │   ├── environment/   # Texturas do ambiente
│   │   └── icons/         # Ícones da interface
│   ├── audio/             # Efeitos sonoros e narração
│   └── models/            # Modelos 3D
├── css/
│   ├── main.css          # Estilos principais
│   └── vr-ui.css         # Estilos específicos para VR
├── js/
│   ├── main.js           # Script principal
│   ├── paintings-data.js # Dados das obras
│   ├── interaction.js    # Sistema de interação
│   └── ui-controller.js  # Controle de interface
├── lib/                  # Bibliotecas externas
├── index.html           # Página principal
└── README.md           # Documentação
```

## 🎯 Funcionalidades

### Interface Web
- Tela de carregamento animada
- Painel de instruções
- Painéis informativos detalhados
- Controles responsivos
- Feedback visual de interação

### Interface VR
- Controles de mão/controlador
- Sistema de teleporte
- Painéis informativos 3D
- Feedback háptico
- Navegação espacial

### Sistema de Informações
- Dados históricos das obras
- Informações sobre artistas
- Contexto histórico
- Curiosidades interessantes
- Detalhes técnicos

## 🔧 Requisitos do Sistema

### Navegador Web
- Chrome 79+ / Firefox 70+ / Safari 13+ / Edge 79+
- Suporte a WebGL 2.0
- 4GB RAM recomendado
- Conexão de internet estável

### Realidade Virtual
- Headset compatível com WebXR
- Controladores VR
- Navegador com suporte WebXR
- Especificações recomendadas pelo fabricante do headset

## 🚀 Instalação e Execução

1. **Clone ou baixe o projeto**
2. **Sirva os arquivos via servidor HTTP**:
   ```bash
   # Usando Python
   python -m http.server 8000
   
   # Usando Node.js
   npx http-server
   
   # Usando PHP
   php -S localhost:8000
   ```
3. **Acesse no navegador**: `http://localhost:8000`

## 🎨 Personalização

### Adicionar Novas Obras
1. Adicione a imagem em `assets/images/paintings/`
2. Inclua a referência em `index.html` na seção `<a-assets>`
3. Adicione os dados em `js/paintings-data.js`
4. Configure a posição em `PAINTINGS_POSITIONS`

### Modificar Ambiente
- Edite as configurações em `setupLighting()` no `main.js`
- Ajuste cores e materiais no `index.html`
- Modifique o ambiente em `museum-environment`

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 79+
- ✅ Firefox 70+
- ✅ Safari 13+
- ✅ Edge 79+
- ✅ Samsung Internet
- ✅ Oculus Browser

### Dispositivos VR Suportados
- ✅ Oculus Quest/Quest 2
- ✅ HTC Vive
- ✅ Valve Index
- ✅ Windows Mixed Reality
- ✅ Pico Interactive

## 🔍 Solução de Problemas

### Problemas Comuns

**Imagens não carregam**
- Verifique se está servindo via HTTP/HTTPS
- Confirme se as imagens estão no diretório correto

**VR não funciona**
- Verifique se o navegador suporta WebXR
- Confirme se o headset está conectado
- Teste em HTTPS (obrigatório para WebXR)

**Performance baixa**
- Pressione 'Q' para reduzir qualidade gráfica
- Feche outras abas do navegador
- Verifique especificações do sistema

## 📄 Licença

Este projeto utiliza obras de arte em domínio público e é destinado para fins educacionais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novas obras
- Melhorar a documentação

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a seção de solução de problemas
2. Consulte a documentação do A-Frame
3. Teste em diferentes navegadores

---

**Desenvolvido com ❤️ para educação e arte**

