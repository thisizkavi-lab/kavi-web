---
layout: page
title: CV
permalink: /cv/
nav: true
nav_order: 4
---

<style>
  .page__title,
  .post-title,
  .post-header {
    display: none !important;
  }

  .cv-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 0.35rem 0 2.5rem;
  }

  .cv-section {
    margin: 0 0 3.4rem;
  }

  .cv-section h2 {
    margin: 0 0 1.55rem;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  .cv-entry {
    padding: 0 0 1.8rem;
    margin: 0 0 1.8rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.18);
  }

  .cv-entry:last-child {
    margin-bottom: 0;
  }

  .cv-place {
    margin: 0;
    font-size: 1.06rem;
    font-weight: 600;
    line-height: 1.45;
  }

  .cv-place a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(127, 127, 127, 0.32);
    transition: border-color 160ms ease, opacity 160ms ease;
  }

  .cv-place a:hover {
    border-bottom-color: currentColor;
    opacity: 0.78;
  }

  .cv-role {
    margin: 0.28rem 0 0;
    font-size: 0.94rem;
    line-height: 1.5;
    opacity: 0.66;
  }

  .cv-date {
    margin: 0.28rem 0 0;
    font-size: 0.88rem;
    line-height: 1.5;
    opacity: 0.5;
  }

  .cv-description {
    max-width: 640px;
    margin: 0.82rem 0 0;
    font-size: 0.96rem;
    line-height: 1.72;
  }

  @media (max-width: 640px) {
    .cv-page {
      padding-top: 0;
    }

    .cv-section {
      margin-bottom: 2.8rem;
    }

    .cv-entry {
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
</style>

<div class="cv-page">
  <section class="cv-section">
    <h2>Research</h2>

    <article class="cv-entry">
      <p class="cv-place"><a href="https://theory.biophys.kyoto-u.ac.jp/" target="_blank" rel="noopener">Theoretical Biophysics Laboratory</a> · <a href="https://www.kyoto-u.ac.jp/en" target="_blank" rel="noopener">Kyoto University</a></p>
      <p class="cv-role">Graduate Student</p>
      <p class="cv-description">Studying protein conformational dynamics—how proteins move between functional states—using molecular simulation and deep learning.</p>
    </article>
  </section>

  <section class="cv-section">
    <h2>Education</h2>

    <article class="cv-entry">
      <p class="cv-place"><a href="https://www.kyoto-u.ac.jp/en" target="_blank" rel="noopener">Kyoto University</a></p>
      <p class="cv-role">Graduate · Biophysics</p>
    </article>

    <article class="cv-entry">
      <p class="cv-place"><a href="https://tu.edu.np/" target="_blank" rel="noopener">Tribhuvan University</a></p>
      <p class="cv-role">Undergraduate · Biology</p>
      <p class="cv-date">2018–2022</p>
    </article>
  </section>
</div>
