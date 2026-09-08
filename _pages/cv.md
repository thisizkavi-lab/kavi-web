---
layout: page
title: CV
permalink: /cv/
nav: true
nav_order: 4
---

<style>
  .page__title { display: none; }

  .cv-page {
    max-width: 760px;
    margin: 0 auto;
    padding: 0.5rem 0 2rem;
  }

  .cv-section {
    margin: 0 0 3.5rem;
  }

  .cv-section h2 {
    margin: 0 0 1.6rem;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .cv-entry {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.35rem 2rem;
    padding: 0 0 1.9rem;
    margin: 0 0 1.9rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.22);
  }

  .cv-entry:last-child {
    margin-bottom: 0;
  }

  .cv-main {
    min-width: 0;
  }

  .cv-place {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 600;
    line-height: 1.45;
  }

  .cv-role {
    margin: 0.25rem 0 0;
    font-size: 0.94rem;
    line-height: 1.5;
    opacity: 0.68;
  }

  .cv-date {
    margin: 0;
    padding-top: 0.08rem;
    font-size: 0.88rem;
    white-space: nowrap;
    opacity: 0.56;
  }

  .cv-description {
    grid-column: 1 / -1;
    max-width: 650px;
    margin: 0.75rem 0 0;
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
      grid-template-columns: 1fr;
      gap: 0.2rem;
      padding-bottom: 1.55rem;
      margin-bottom: 1.55rem;
    }

    .cv-date {
      grid-row: 2;
      padding-top: 0;
    }

    .cv-description {
      grid-column: 1;
      margin-top: 0.65rem;
    }
  }
</style>

<div class="cv-page">
  <section class="cv-section">
    <h2>Research</h2>

    <article class="cv-entry">
      <div class="cv-main">
        <p class="cv-place">Theoretical Biophysics Laboratory, Kyoto University</p>
        <p class="cv-role">Graduate Student</p>
      </div>
      <p class="cv-description">Studying protein conformational dynamics—how proteins move between functional states—using molecular simulation and deep learning.</p>
    </article>

    <article class="cv-entry">
      <div class="cv-main">
        <p class="cv-place">Central Department of Biotechnology, Tribhuvan University</p>
        <p class="cv-role">Research Intern</p>
      </div>
      <p class="cv-date">2023–2024</p>
      <p class="cv-description">Worked on CRISPR/Cas9 gene editing in diverse Nepali rice varieties, with a focus on disease resistance, stress tolerance, and productivity.</p>
    </article>
  </section>

  <section class="cv-section">
    <h2>Education</h2>

    <article class="cv-entry">
      <div class="cv-main">
        <p class="cv-place">Kyoto University</p>
        <p class="cv-role">Graduate School of Science · Biophysics</p>
      </div>
    </article>

    <article class="cv-entry">
      <div class="cv-main">
        <p class="cv-place">Tribhuvan University</p>
        <p class="cv-role">B.Sc. Biology</p>
      </div>
      <p class="cv-date">2018–2022</p>
    </article>
  </section>

  <section class="cv-section">
    <h2>Activities</h2>

    <article class="cv-entry">
      <div class="cv-main">
        <p class="cv-place">iGEM · SynBio 101</p>
        <p class="cv-role">Regional Head, Nepal · Project Member</p>
      </div>
      <p class="cv-date">2022–2023</p>
    </article>
  </section>
</div>
