---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: Taming Dependency Chaos for LLM in K8S
exportFilename: KubeCon HK 2025.06 - Taming Dependency Chaos for LLM in K8S
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
# glowSeed: 26
glowSeed: 229
routerMode: hash
---

# Taming Dependency Chaos for LLM in K8S

DaoCloud Fanshi Zhang, Kebe Liu, Peter Pan

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>

---
layout: intro
class: px-24
glowSeed: 205
---

<div flex items-center justify-center>
  <div
    v-click flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <img src="/DaoCloud.svg" h-40 />
    </div>
  </div>
  <div
    v-after pl-15 pr-15 transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'scale-80' : 'scale-100'"
  >
    <div i-carbon:close text-8xl />
  </div>
  <div
    v-after flex flex-col gap-2 items-center justify-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x-20' : 'translate-x-0'"
  >
    <div flex items-center gap-6>
      <div i-devicon:kubernetes inline-block text-6xl /> <span text-4xl text="[#5791f7]">Kubernetes</span>
    </div>
  </div>
</div>

<!--
Before we start, let's introduce ourselves.

[click] We are the software engineers come from DaoCloud, one of the famously known corporation that put much efforts into open source and Kubernetes ecosystems.

With now primarily focusing on field to cohere Kubernetes and AI together.
-->

---
layout: intro
class: px-35
glowSeed: 205
---

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20' : 'translate-x-0'"
  >
    <img src="/person/kebe.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Kebe Liu</span>
    <div>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>kebe7jun</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="2" flex flex-col items-end transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-x-20' : 'translate-x-0'"
  >
    <img src="/person/neko.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Fanshi Zhang</span>
    <div flex-col items-end>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-end gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
</div>

<!--
As background, [click] Kebe Liu is one of the member of Istio Steering Committee, while working on AI stuff, he is also focusing on the other Cloud native projects like Istio, eBPF, etc. in recent years.

[click] Me, Fanshi Zhang, I am a software engineer at DaoCloud, focusing on AI and Kubernetes. I am also a contributor to the Kubernetes community. As well as contributor to Golang, Vue communities.
-->

---
class: py-10
---

<div flex>
  <div flex-1>
    <div mt-50 />
    <div text="[48px]">
      Thank you
    </div>
  </div>
  <div text-sm text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      Slides open sourced at <a href="https://github.com/BaizeAI/talks"><div inline-block mr-1 translate-y-0.8 i-ri:github-fill />github.com/BaizeAI/talks</a>
    </div>
    <div>
      Slides built on top of <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a>
    </div>
    <div self-end mt-16 translate-x-6>
      <img src="/public/slide_qr.png" w-50 />
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.png" h-10>
    <img src="/CloudNativeCon.png" h="10.1">
    <img src="/OpenSourceSummit.png" h-9>
    <img src="/AI_dev.png" h-4>
  </div>
</div>

<!--
With all of that, that's the end of today's session.

I bet many of you may asking for how to make this PPT, we open sourced it, it built with codes.

We would like to ask you to give us some thumb ups on sched.

Any questions?
-->
