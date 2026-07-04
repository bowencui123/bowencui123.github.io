---
permalink: /
title: "Biography"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% include base_path %}

<p class="hero-tagline">I work on making code run <span class="gradient-text">faster</span> — studying how large language models understand and optimize performance, from GPU kernels to HPC applications.</p>

<div class="chip-row">
  <span class="chip"><i class="fas fa-server" aria-hidden="true"></i> High-Performance Computing</span>
  <span class="chip"><i class="fas fa-bolt" aria-hidden="true"></i> Code Optimization</span>
  <span class="chip"><i class="fas fa-robot" aria-hidden="true"></i> Large Language Models</span>
</div>

<p>Bowen Cui is a Ph.D. student (since Fall 2024) in the <a href="https://cs.gmu.edu/">Department of Computer Science</a> at <a href="https://www.gmu.edu/">George Mason University</a> (GMU), advised by Professor <a href="https://www.jokeren.tech/">Keren Zhou</a>. He obtained his master's degree in Statistics from Washington University in St. Louis (WUSTL) and his bachelor's degree in Applied Mathematics from Xi'an Jiaotong-Liverpool University (XJTLU). His research interests focus on High-Performance Computing, Code Optimization, and Large Language Models.</p>

<div class="cta-row">
  <a class="cta-btn cta-btn--primary" href="mailto:bcui2@gmu.edu"><i class="fas fa-envelope" aria-hidden="true"></i> Email</a>
  <a class="cta-btn" href="https://scholar.google.com/citations?user=Bxt28QQAAAAJ&hl=en"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</a>
  <a class="cta-btn" href="https://github.com/bowencui123"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
  <a class="cta-btn" href="{{ base_path }}/cv/"><i class="fas fa-file-alt" aria-hidden="true"></i> CV</a>
</div>

<h2 class="section-title">News</h2>

<div class="news-list">
  {% for item in site.data.news %}
  <div class="news-item">
    <span class="news-date">{{ item.date }}</span>
    <span class="news-text">{{ item.text }}</span>
  </div>
  {% endfor %}
</div>

<h2 class="section-title">Research Interests</h2>

<div class="research-grid">
  <div class="research-card">
    <i class="fas fa-robot" aria-hidden="true"></i>
    <h3>LLMs for Code Performance</h3>
    <p>Evaluating and improving how large language models understand and apply performance optimization.</p>
  </div>
  <div class="research-card">
    <i class="fas fa-server" aria-hidden="true"></i>
    <h3>High-Performance Computing</h3>
    <p>Performance analysis and optimization of parallel applications on modern GPU systems.</p>
  </div>
  <div class="research-card">
    <i class="fas fa-bolt" aria-hidden="true"></i>
    <h3>Code Optimization</h3>
    <p>Kernel- and compiler-level techniques that squeeze more performance out of modern hardware.</p>
  </div>
</div>

<h2 class="section-title">Education</h2>

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-years">2024 — Present</div>
    <div class="timeline-degree">Ph.D. in Computer Science</div>
    <div class="timeline-school">George Mason University · Advised by <a href="https://www.jokeren.tech/">Prof. Keren Zhou</a></div>
  </div>
  <div class="timeline-item">
    <div class="timeline-degree">M.S. in Statistics</div>
    <div class="timeline-school">Washington University in St. Louis</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-degree">B.S. in Applied Mathematics</div>
    <div class="timeline-school">Xi'an Jiaotong-Liverpool University</div>
  </div>
</div>

<h2 class="section-title">Selected Publications</h2>

{% assign sorted_pubs = site.publications | sort: 'date' | reverse %}
{% for post in sorted_pubs limit:2 %}
  {% include archive-single.html %}
{% endfor %}

<p><a class="see-all" href="{{ base_path }}/publications/">See all publications <i class="fas fa-arrow-right" aria-hidden="true"></i></a></p>
