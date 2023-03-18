import style from './footer.css';
import logo from './../../resources/icons/GitHub_Logo.png';

const FooterComponent = (
  () => {
  return {
    render: function () {
      const fragment = document.createDocumentFragment();
      const footer = document.createElement('footer');
      fragment.appendChild(footer);
      footer.classList.add('footer');

      const div = document.createElement('div');

      const builtSpan = document.createElement('span');
      builtSpan.textContent = 'Built for The Odin Project, 2023';

      const anchorGithub = document.createElement('a');
      anchorGithub.href = 'https://github.com/thewhitehaven04';

      const githubLogo = new Image(60, 24);
      githubLogo.src = logo;
      anchorGithub.appendChild(githubLogo);

      div.append(builtSpan, anchorGithub);
      div.classList.add('footer-info__flex');

      footer.append(div);

      return fragment;
    },
  };
})();

export { FooterComponent };
