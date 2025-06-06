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
glowSeed: 229
routerMode: hash
---

<div translate-x--14>

<h1>
  Taming Dependency Chaos for LLM in K8S
</h1>

DaoCloud Fanshi Zhang, Kebe Liu, Peter Pan

</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
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
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
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
    :class="$clicks < 1 ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div flex items-center gap-6>
      <div i-devicon:kubernetes inline-block text-6xl /> <span text-4xl text="[#5791f7]">Kubernetes</span>
    </div>
  </div>
</div>

---
layout: intro
class: px-35
glowSeed: 205
---

<div flex>
  <div
    v-click="1" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/peter.png" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl >Peter Pan</span>
    <div items-center>
      <div>
        <span class="opacity-70">Software Engineering VP</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>panpan0000</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="2" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/kebe.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Kebe Liu</span>
    <div items-center>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>kebe7jun</span>
      </div>
    </div>
  </div>
  <div flex-1 />
  <div
    v-click="3" flex flex-col items-center transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'"
  >
    <img src="/person/neko.jpeg" w-50 h-50 rounded-full object-cover mb-5>
    <span font-semibold text-3xl>Fanshi Zhang</span>
    <div flex-col items-center>
      <div>
        <span class="opacity-70">Senior software engineer</span>
      </div>
      <div text-sm flex items-center justify-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>nekomeowww</span>
      </div>
    </div>
  </div>
</div>

---
layout: center
class: text-center
---

# "It Works On My Machine"™

The ML Engineer's Lament

<div class="mt-8 text-xl opacity-80">
  How many times have you seen this?
</div>

<div class="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 text-left">

```bash
$ python train.py
ImportError: libcudart.so.11.0: cannot open shared object file

$ pip install torch --index-url https://download.pytorch.org/whl/cu118
RuntimeError: CUDA error: no kernel image is available for execution

$ ldd $(which python3) | grep 'not found'
        libstdc++.so.6 => not found
```

</div>

---
clicks: 3
---

# When Python Meets C++

Dependency Hell Emerges

<div class="mt-8 flex flex-col justify-center items-center">
  <div v-click class="flex items-center gap-6">
    <div class="flex items-center justify-center">
      <div class="text-[96px] i-logos:python" />
    </div>
    <div class="flex items-center justify-center">
      <div class="text-[96px] i-logos:c-plusplus" />
    </div>
  </div>
  <div
    :class="[ $clicks < 2 ? 'scale-50 opacity-0' : 'scale-100 opacity-100' ]"
    class="text-center"
    transition="all duration-500 ease-in-out"
  >
    <div class="text-8xl i-carbon:warning-alt mt-5 ml-5 text-red" />
  </div>
</div>

<div v-click class="mt-10 text-center">
  <h3>The Perfect Storm: When Python Code Meets C++ Underpinnings</h3>
  <p class="mt-4 text-xl opacity-70">ML libraries are just thin Python wrappers around massive C++ and CUDA codebases</p>
</div>

---
class: py-10
glowSeed: 123
---

# The Silent Saboteurs

<span>Hidden issues that break ML pipelines</span>

<div mt-4 />

<div flex items-center gap-4>

<v-clicks>
  <div
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid purple-800" bg="purple-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:cics-program text-violet-300 h-20 w-20 />
    </div>
    <div bg="purple-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>ABI Incompatibility</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid violet-800" bg="violet-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-bi:gpu-card text-violet-300 h-20 w-20 />
    </div>
    <div bg="violet-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>CUDA Version Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid indigo-800" bg="indigo-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:terminal text-indigo-300 h-20 w-20 />
    </div>
    <div bg="indigo-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>System Library Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid blue-800" bg="blue-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:document-multiple text-blue-300 h-20 w-20 />
    </div>
    <div bg="blue-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>Package Inconsistencies</span>
    </div>
  </div>
</v-clicks>

</div>

<div v-click flex flex-col mt-4 bg="red-800/20" border="2 solid red-800/50" rounded-lg>
  <div bg="red-800/30" px-4 py-2 text-red-200 flex items-center>
    <div i-carbon:warning-alt mr-2 /> Real World Impact
  </div>
  <div flex justify-between px-6 py-4 text-sm>
    <div flex items-center gap-2>
      <div i-carbon:time text-red-300 text-xl />
      <span>Hours wasted reinstalling CUDA</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:chart-evaluation text-red-300 text-xl />
      <span>Inconsistent model results</span>
    </div>
    <div flex items-center gap-2>
      <div i-carbon:cloud-service-management text-red-300 text-xl />
      <span>Broken production deployments</span>
    </div>
  </div>
</div>

---
layout: center
---

# The Hidden Iceberg: What pip Can't See

<div class="mt-4 grid grid-cols-2 gap-8">
  <div v-click class="relative">
    <div class="relative h-80">
      <div class="absolute bottom-0 w-full bg-blue-500/20 h-60 rounded-t-full"></div>
      <div class="absolute top-0 w-full">
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 class="mb-4">Visible Surface</h3>
          <code class="text-sm">
            torch==2.1.0<br>
            transformers==4.36.0<br>
            accelerate==0.25.0
          </code>
        </div>
      </div>
      <div v-click class="absolute bottom-0 w-full">
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
          <h3 class="mb-4">Hidden Depths</h3>
          <code class="text-xs">
            CUDA 11.8<br>
            gcc 9.4.0<br>
            cmake 3.22.1<br>
            libnccl2<br>
            libcudnn8<br>
            cuda-cupti-dev<br>
            ...and dozens more
          </code>
        </div>
      </div>
    </div>
  </div>

  <div v-click class="space-y-4">
    <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <h3 class="mb-2">Python Package Managers</h3>
      <ul class="space-y-2 text-sm">
        <li class="flex items-center gap-2">
          <div i-carbon:checkmark class="text-green-400" />
          <span>Handle Python dependencies well</span>
        </li>
        <li class="flex items-center gap-2">
          <div i-carbon:close class="text-red-400" />
          <span>Blind to underlying C++ libraries</span>
        </li>
        <li class="flex items-center gap-2">
          <div i-carbon:close class="text-red-400" />
          <span>No system-level dependency management</span>
        </li>
      </ul>
    </div>

    <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <h3 class="mb-2">The Reality</h3>
      <p class="text-sm opacity-80">Modern ML libraries are just thin Python wrappers around massive C++ and CUDA codebases</p>
    </div>
  </div>
</div>

---
layout: center
---

# CUDA Conundrum: The Version Wars

<div class="grid grid-cols-3 gap-4 mt-6">
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 11.8</h3>
    <p class="text-sm opacity-70">PyTorch's Choice</p>
    <p class="text-xs mt-2 text-green-300">Optimized for current models</p>
  </div>
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 12.1</h3>
    <p class="text-sm opacity-70">System Default</p>
    <p class="text-xs mt-2 text-yellow-300">Newest features, compatibility issues</p>
  </div>
  <div v-click class="flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <div class="text-4xl mb-4">🎯</div>
    <h3>Version 11.6</h3>
    <p class="text-sm opacity-70">Legacy Model</p>
    <p class="text-xs mt-2 text-red-300">Required by older frameworks</p>
  </div>
</div>

<div v-click class="mt-8 grid grid-cols-2 gap-4">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <h3 class="mb-2">CUDA Complexity</h3>
    <ul class="space-y-1 text-sm">
      <li>• Driver vs Runtime version mismatch</li>
      <li>• cuDNN compatibility matrix</li>
      <li>• NCCL version requirements</li>
    </ul>
  </div>

  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <h3 class="mb-2">The Silent Killer</h3>
    <p class="text-sm text-red-400">Often fails with cryptic errors or worse - <span class="font-bold">silent numerical errors</span> in your models</p>
  </div>
</div>

---
class: py-10
clicks: 6
glow: right
---

# Compiler Chaos: When gcc Versions Wage War

<span>The battlefield of binary compatibility</span>

<div mt-6 />

<div flex>
  <div flex-1 pr-4>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg p-4
    >
      <div flex items-center>
        <div i-devicon:gcc text-3xl mr-2 />
        <span font-bold>GCC Version Matrix</span>
      </div>
      <div mt-4 flex justify-around>
        <div
          v-for="(version, idx) in ['4.8.5', '9.4.0', '11.2.0']"
          :key="version"
          :class="[
            'relative px-4 py-3 rounded-lg border-2 transition-all duration-500',
            $clicks >= idx+1 ? 'border-sky-500 scale-110' : 'border-zinc-700 opacity-50'
          ]"
        >
          <span font-mono text-lg>{{version}}</span>
          <div
            v-if="$clicks >= idx+1"
            class="absolute -top-2 -right-2 rounded-full bg-sky-500 px-2 py-0.5 text-xs"
          >
            {{['CentOS 7', 'PyTorch', 'Ubuntu 22.04'][idx]}}
          </div>
        </div>
      </div>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
      mt-4 border="2 solid red-800" bg="red-800/20"
      rounded-lg p-4
    >
      <div flex items-center>
        <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
        <span font-bold>Binary Incompatibility</span>
      </div>
      <div
        mt-3 flex flex-col gap-2
        :class="{ 'animate-pulse': $clicks >= 4 }"
      >
        <div
          bg="red-900/50"
          rounded px-3 py-2 font-mono text-sm
          :class="{ 'text-red-300': $clicks >= 4 }"
        >
          ImportError: /lib64/libstdc++.so.6: version 'GLIBCXX_3.4.29' not found
        </div>
        <div
          bg="red-900/50"
          rounded px-3 py-2 font-mono text-sm
          :class="{ 'text-red-300': $clicks >= 5 }"
        >
          undefined symbol: _ZN3c10...
        </div>
      </div>
    </div>
  </div>

  <div flex-1 pl-4>
    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg p-4 h-full
    >
      <div flex items-center>
        <div i-carbon:code text-blue-300 text-xl mr-2 />
        <span font-bold>C++ ABI Changes</span>
      </div>
      <div mt-4 flex flex-col gap-4>
        <div
          v-click="6"
          flex flex-col border="1 solid blue-600" rounded-lg overflow-hidden
        >
          <div bg="blue-800/50" py-1 px-3 text-sm>String Implementation</div>
          <div font-mono text-xs p-2>
            <div class="text-blue-300">// GCC 4.x</div>
            struct string {
              char* _M_p;
              size_t _M_string_length;
            };
            <div class="text-green-300">// GCC 5.x+</div>
            struct string {
              union { ... } _M_dataplus;
              ... _M_string_length;
            };
          </div>
        </div>
        <div flex justify-center items-center text-lg text-red-300 font-bold>
          <div i-carbon:arrow-down animate-bounce text-2xl />
          <span ml-2>Memory Layout Mismatch</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="6"
  flex justify-center mt-4 bg="indigo-800/30" border="2 solid indigo-600"
  rounded-lg py-3 items-center
>
  <div i-carbon:face-dizzy text-2xl mr-2 />
  <span text-xl>The Developer Experience: "It works differently everywhere!"</span>
</div>

---
class: py-10
clicks: 7
glowSeed: 350
---

# Why Reusable Environments Matter

<span>From hours of frustration to seconds of mounting</span>

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div
    v-click="1"
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
      <span font-bold>Traditional Workflow</span>
    </div>
    <div px-5 py-4 flex flex-col gap-2>
      <div
        v-for="(item, idx) in [
          'Different setups across team',
          'Hours reinstalling CUDA',
          'Notebook vs. production mismatch',
          'Works locally, fails in prod'
        ]"
        :key="item"
        v-click="2 + idx"
        flex items-center gap-2
        :class="$clicks < (2 + idx) ? 'opacity-0 translate-x--10' : 'opacity-100 translate-x-0'"
        transition duration-300 ease-in-out
      >
        <div i-carbon:close-filled text-red-400 />
        <span>{{item}}</span>
      </div>
    </div>
  </div>

  <div
    v-click="6"
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 6 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:checkmark text-green-300 text-xl mr-2 />
      <span font-bold>Reusable Environments</span>
    </div>
    <div px-5 py-4 flex flex-col gap-2>
      <div
        v-for="item in [
          'One environment definition, everywhere',
          'Install once, mount instantly',
          'Identical experience for all team members',
          'Seamless dev-to-prod workflow'
        ]"
        :key="item"
        flex items-center gap-2
      >
        <div i-carbon:checkmark-filled text-green-400 />
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</div>

<div v-click="7" mt-6>
  <div flex items-center justify-center>
    <div
      transition duration-500 ease-in-out
      relative flex bg="neutral-800/50" border="2 solid neutral-600" rounded-xl p-2 gap-2 max-w-180
    >
      <div w-80 bg="red-900/30" rounded-lg p-3 relative>
        <div absolute top--3 left-3 bg="red-700" text-xs px-2 py-0.5 rounded-full>Without Reusable Environments</div>
        <div flex items-center gap-2 text-xl>
          <div i-carbon:time text-red-300 />
          <span font-bold>4-6 Hours</span>
        </div>
        <div text-sm mt-2 opacity-70>
          Per developer, per environment setup
        </div>
        <div flex flex-col gap-1 mt-4>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>Manual CUDA installation</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>System library conflicts</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:close-filled text-red-400 text-sm />
            <span>Disk space duplication</span>
          </div>
        </div>
      </div>
      <div w-80 bg="green-900/30" rounded-lg p-3 relative>
        <div absolute top--3 left-3 bg="green-700" text-xs px-2 py-0.5 rounded-full>With Reusable Environments</div>
        <div flex items-center gap-2 text-xl>
          <div i-carbon:time text-green-300 />
          <span font-bold>30 Seconds</span>
        </div>
        <div text-sm mt-2 opacity-70>
          Just mount the shared environment
        </div>
        <div flex flex-col gap-1 mt-4>
          <div flex items-center text-xs gap-1>
            <div i-carbon:checkmark-filled text-green-400 text-sm />
            <span>Pre-built environments</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:checkmark-filled text-green-400 text-sm />
            <span>Consistent across team</span>
          </div>
          <div flex items-center text-xs gap-1>
            <div i-carbon:checkmark-filled text-green-400 text-sm />
            <span>Efficient storage usage</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 5
glow: left
---

# The Usual Suspects: Tools We've Tried

<span>What works, what doesn't, and why</span>

<div mt-8 />

<div flex justify-center>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    grid grid-cols-3 gap-8 w-full max-w-180
  >
    <div
      v-click="1"
      border="2 solid sky-800" bg="sky-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="sky-800/40" px-4 py-3 flex items-center>
        <div i-logos:python text-3xl mr-3 />
        <span font-bold>pip & uv</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Fast for Python packages</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Blind to C++/CUDA deps</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>No system library management</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Version conflicts common</span>
        </div>
      </div>
    </div>
    <div
      v-click="2"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="blue-800/40" px-4 py-3 flex items-center>
        <div i-devicon:docker text-3xl mr-3 />
        <span font-bold>Docker</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Reproducible environments</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Massive image sizes (5-10GB)</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Slow build times (30+ min)</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Resource intensive</span>
        </div>
      </div>
    </div>
    <div
      v-click="3"
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="purple-800/40" px-4 py-3 flex items-center>
        <div i-devicon:nixos text-3xl mr-3 />
        <span font-bold>Nix</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Complete reproducibility</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>PhD-level learning curve</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>Complex configuration</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:close text-red-400 />
          <span>K8s integration challenges</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="4"
  mt-10 transition-all duration-500
  :class="$clicks < 4 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
>
  <div flex items-center justify-center>
    <div relative>
      <div
        v-if="$clicks === 5"
        absolute -top-12 left="1/2" transform -translate-x="1/2"
        flex items-center gap-2 bg="green-800/60" border="2 solid green-600"
        px-4 py-2 rounded-full text-green-300 font-bold
      >
        <div i-carbon:checkmark />
        <span>Our Solution</span>
      </div>
      <div
        border="2 solid green-800" bg="green-800/20"
        rounded-lg p-4 w-160
        :class="$clicks === 5 ? 'border-green-500 scale-110 transition-all duration-500' : ''"
      >
        <div text-center font-bold text-xl mb-3>What We Need</div>
        <div grid grid-cols-3 gap-4>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Python package management</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>C++/CUDA awareness</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Storage efficiency</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Fast setup times</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>K8s native</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Team consistency</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
glowSeed: 12129
---

# Introducing Datasets: Python + C++ Harmony in K8S

<div class="mt-6 flex justify-center">
  <div class="relative w-120 h-60">
    <div v-click class="absolute inset-0 flex items-center justify-center">
      <div class="text-[150px] i-logos:kubernetes" />
    </div>
    <div v-click class="absolute top-17 left--4">
      <div class="text-7xl i-logos:python" />
    </div>
    <div v-click class="absolute top-18 right--16">
      <div class="text-4xl i-logos:conda" />
    </div>
    <div v-click class="absolute bottom--4 left-8">
      <div class="text-[100px] i-devicon:docker" />
    </div>
    <div v-click class="absolute bottom-4 right--8">
      <div class="text-4xl i-logos:nvidia" />
    </div>
  </div>
</div>

<div v-click class="mt-8 text-center">
  <h3>One solution to rule them all</h3>
  <p class="opacity-70">Python + C++ + CUDA harmony in Kubernetes</p>
</div>

---

# One CRD to Rule Them All

<div class="flex relative">

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">

```yaml
apiVersion: dataset.baize.io/v1alpha1
kind: Dataset
metadata:
  name: pytorch-env
spec:
  source:
    type: CONDA
    uri: conda://python?version=3.11.9
    options:
      packageManager: CONDA
      pythonVersion: 3.11.9
      condaEnvironmentYml: |-
        channels: ['nvidia', 'conda-forge']
        dependencies: [
          - 'cuda'
          - 'cuda-libraries-dev'
          - 'cuda-nvcc'
          - 'cuda-nvtx'
          - 'cuda-cupti'
      pipRequirementsTxt: |-
        transformers==4.35.0
        torch
        torchaudio
        torchvision
```

  </div>
</div>

<div class="absolute right-0 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <div text-xl text-neutral-300>Key Features</div>
    <ul class="mt-4">
      <li>• Multi-source support (<code>conda</code>, <code>huggingface</code>)</li>
      <li>• Self-contained enterprise model hub</li>
      <li>• Pre-loaded datasets and models</li>
      <li>• Install once, use everywhere</li>
      <li>• Secure credential management</li>
    </ul>
  </div>
</div>

</div>

---
class: py-10
clicks: 4
glowSeed: 182
---

# X-Ray Vision: Datasets Architecture

<span>Looking under the hood</span>

<div mt-8 />

<div flex>
  <div w="1/2" pr-6>
    <div
      v-click="1"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="blue-800/40" px-4 py-2 flex items-center>
        <div i-carbon:kubernetes text-blue-300 text-xl mr-2 />
        <span font-bold>Controller Architecture</span>
      </div>
      <div px-5 py-3>
        <div
          v-for="(step, idx) in [
            'Parse Dataset CRD & validate spec',
            'Check source type & credentials',
            'Create/update PVC with JuiceFS',
            'Deploy init container for setup',
            'Download/sync data from source',
            'Configure mount options',
            'Update dataset status'
          ]"
          :key="step"
          flex items-center gap-2 py-1
          :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
          :style="{ transitionDelay: `${200 + idx * 100}ms`, transitionProperty: 'all', transitionDuration: '500ms' }"
        >
          <div i-carbon:dot-mark text-blue-300 />
          <span>{{step}}</span>
        </div>
      </div>
    </div>
    <div
      v-click="3"
      mt-4
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 3 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="purple-800/40" px-4 py-2 flex items-center>
        <div i-carbon:data-share text-purple-300 text-xl mr-2 />
        <span font-bold>Multi-Source Support</span>
      </div>
      <div px-5 py-3 grid grid-cols-2 gap-2>
        <div flex items-center gap-2>
          <div i-logos:python text-2xl />
          <span>CONDA environments</span>
        </div>
        <div flex items-center gap-2>
          <div i-logos:huggingface text-2xl />
          <span>HuggingFace models</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:cloud text-2xl />
          <span>Custom repositories</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:storage-pool text-2xl />
          <span>Private model hub</span>
        </div>
      </div>
    </div>
  </div>

  <div w="1/2" pl-6>
    <div
      v-click="4"
      relative
      transition duration-500 ease-in-out
      :class="$clicks < 4 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
    >
      <div absolute -left-12 top="1/3" -rotate-90 text-zinc-400 font-bold text-sm>DATA FLOW</div>
      <svg width="100%" height="300" viewBox="0 0 400 300">
        <!-- Layered boxes -->
        <rect x="50" y="30" width="300" height="50" rx="5" fill="rgba(56, 189, 248, 0.2)" stroke="rgba(56, 189, 248, 0.6)" stroke-width="2"/>
        <text x="200" y="60" text-anchor="middle" fill="white" font-size="14">Dataset CRD</text>
        <path d="M200 80 L200 100" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="195,100 205,100 200,110" fill="white"/>
        <rect x="50" y="110" width="300" height="50" rx="5" fill="rgba(168, 85, 247, 0.2)" stroke="rgba(168, 85, 247, 0.6)" stroke-width="2"/>
        <text x="200" y="140" text-anchor="middle" fill="white" font-size="14">Dataset Controller</text>
        <path d="M200 160 L200 180" stroke="white" stroke-width="2" stroke-dasharray="4 2"/>
        <polygon points="195,180 205,180 200,190" fill="white"/>
        <rect x="50" y="190" width="300" height="50" rx="5" fill="rgba(74, 222, 128, 0.2)" stroke="rgba(74, 222, 128, 0.6)" stroke-width="2"/>
        <text x="200" y="220" text-anchor="middle" fill="white" font-size="14">JuiceFS Shared Storage</text>
        <!-- Side connectors -->
        <path d="M50 135 L20 135 L20 215 L50 215" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
        <path d="M350 135 L380 135 L380 215 L350 215" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
        <!-- Icons -->
        <text x="70" y="60" font-family="monospace" font-size="18">🧩</text>
        <text x="70" y="140" font-family="monospace" font-size="18">🔄</text>
        <text x="70" y="220" font-family="monospace" font-size="18">💾</text>
      </svg>
      <div
        grid grid-cols-2 gap-2 mt-2
        border="2 solid green-800" bg="green-800/10"
        rounded-lg p-3
      >
        <div flex items-center gap-2 text-sm>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Built on JuiceFS for shared storage</span>
        </div>
        <div flex items-center gap-2 text-sm>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>CUDA-aware environment resolution</span>
        </div>
        <div flex items-center gap-2 text-sm>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Intelligent caching of packages</span>
        </div>
        <div flex items-center gap-2 text-sm>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Deduplication of common libraries</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

# Cross-Namespace Dataset Sharing

<div class="flex relative">

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
# Sharing Dataset
apiVersion: dataset.baize.io/v1alpha1
kind: Dataset
metadata:
  name: training-sample-code
  namespace: default
spec:
  shared: true
  shareToNamespaceSelector:
    matchExpressions:
      - key: example.io/workspace-id
        operator: In
        values: ['4']

# LINK Dataset
apiVersion: dataset.baize.io/v1alpha1
kind: Dataset
metadata:
  name: training-sample-code-ref
spec:
  source:
    type: REFERENCE
    uri: dataset://default/training-sample-code
```

  </div>
</div>

<div v-click class="absolute right-0 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <div text-xl text-neutral-300>Key Features</div>
    <ul class="mt-4">
      <li>• Fine-grained namespace access control</li>
      <li>• Automatic PVC/PV creation for LINKs</li>
      <li>• UI for managing shared Datasets</li>
      <li>• API for discovering shared Datasets</li>
      <li>• Synchronized lifecycle management</li>
    </ul>
  </div>
</div>

</div>

---
class: py-10
clicks: 3
glow: bottom
---

# Enterprise Model Hub in Minutes

<span>From fragmented assets to unified ecosystem</span>

<div mt-6 />

<div flex>
  <div
    v-click="1"
    w="1/2" pr-4
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div
      border="2 solid violet-800" bg="violet-800/20"
      rounded-lg overflow-hidden relative h-70
    >
      <div bg="violet-800/40" px-4 py-2 flex items-center>
        <div i-carbon:machine-learning-model text-violet-300 text-xl mr-2 />
        <span font-bold>Model Management</span>
      </div>
      <div
        absolute left-0 right-0 top-12 bottom-0
        class="bg-[url('/bg-grid.svg')] bg-center"
      >
        <div
          v-for="(item, idx) in [
            { x: 20, y: 25, r: 40, color: 'rgba(139, 92, 246, 0.5)', label: 'Llama-3' },
            { x: 120, y: 55, r: 30, color: 'rgba(139, 92, 246, 0.5)', label: 'Mistral' },
            { x: 75, y: 130, r: 50, color: 'rgba(139, 92, 246, 0.5)', label: 'PyTorch' },
            { x: 170, y: 120, r: 35, color: 'rgba(139, 92, 246, 0.5)', label: 'SD-3' }
          ]"
          :key="idx"
          absolute
          class="rounded-full flex items-center justify-center"
          :style="{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: `${item.r*2}px`,
            height: `${item.r*2}px`,
            backgroundColor: item.color,
            border: '2px solid rgba(139, 92, 246, 0.8)',
            transitionDelay: `${300 + idx * 200}ms`,
            transitionProperty: 'all',
            transitionDuration: '800ms'
          }"
        >
          <span font-bold text-sm>{{item.label}}</span>
        </div>
        <div absolute right-4 bottom-4 flex flex-col gap-3>
          <div flex items-center gap-2 bg="violet-900/60" px-3 py-1.5 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Version control</span>
          </div>
          <div flex items-center gap-2 bg="violet-900/60" px-3 py-1.5 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Metadata extraction</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    w="1/2" pl-4
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden relative h-70
    >
      <div bg="blue-800/40" px-4 py-2 flex items-center>
        <div i-carbon:time text-blue-300 text-xl mr-2 />
        <span font-bold>Ready Before You Are</span>
      </div>
      <div px-3 py-4>
        <div flex justify-between items-center>
          <div text-sm text-zinc-400>Deployment Timeline</div>
          <div text-sm text-zinc-400>Time Savings</div>
        </div>
        <div mt-4 relative h-40>
          <!-- Traditional timeline -->
          <div absolute top-0 left-0 right-0 flex flex-col gap-1>
            <div flex items-center>
              <div w-24 text-xs pr-2 text-right text-red-400>Traditional</div>
              <div h-6 rounded-l bg="red-900/50" w-10 flex items-center justify-center text-xs>1h</div>
              <div h-6 bg="red-800/50" w-20 flex items-center justify-center text-xs>2h</div>
              <div h-6 rounded-r bg="red-700/50" w-24 flex items-center justify-center text-xs>3h</div>
            </div>
            <div flex items-center text-[10px] text-zinc-400 pl-24>
              <div w-10 text-center>Setup</div>
              <div w-20 text-center>Install</div>
              <div w-24 text-center>Configuration</div>
            </div>
          </div>
          <!-- Dataset timeline -->
          <div absolute bottom-0 left-0 right-0 flex flex-col gap-1>
            <div flex items-center>
              <div w-24 text-xs pr-2 text-right text-green-400>With Datasets</div>
              <div h-6 rounded bg="green-900/50" w-10 flex items-center justify-center text-xs>30s</div>
              <div w-10 />
              <div h-6 w-8 flex items-center justify-center text-lg text-green-400 animate-pulse>⚡️</div>
            </div>
            <div flex items-center text-[10px] text-zinc-400 pl-24>
              <div w-10 text-center>Mount</div>
            </div>
          </div>
          <!-- Time saved indicator -->
          <div absolute right-8 top="1/2" transform -translate-y="1/2" flex flex-col items-center>
            <div text-green-400 text-3xl font-bold>95%</div>
            <div text-sm text-zinc-400>Time Saved</div>
          </div>
        </div>
        <div mt-4 grid grid-cols-2 gap-2>
          <div flex items-center gap-2 bg="blue-900/40" px-3 py-2 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>No waiting for CUDA compilation</span>
          </div>
          <div flex items-center gap-2 bg="blue-900/40" px-3 py-2 rounded-lg text-sm>
            <div i-carbon:checkmark-outline text-green-400 />
            <span>Environments ready to use</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="3"
  mt-6 flex justify-center
  transition duration-500 ease-in-out
  :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    flex items-center bg="green-900/30" border="2 solid green-700"
    rounded-lg py-3 px-6 gap-4
  >
    <div i-carbon:transform-moving text-green-300 text-3xl />
    <div>
      <div text-xl font-bold>From <span text-red-400>isolated silos</span> to <span text-green-400>unified model ecosystem</span></div>
      <div text-sm text-zinc-300 mt-1>Enabling seamless collaboration across data science teams</div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 3
glowSeed: 88
---

# Dataloader: The Polyglot Dependency Manager

<span>The command-line superpower for dependency control</span>

<div mt-6 />

<div flex>
  <div
    v-click="1"
    w="1/2" pr-4
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-x--20' : 'opacity-100 translate-x-0'"
  >
    <div
      border="2 solid sky-800" bg="sky-800/20"
      rounded-lg overflow-hidden relative
    >
      <div bg="sky-800/40" px-4 py-2 flex items-center>
        <div i-carbon:terminal text-sky-300 text-xl mr-2 />
        <span font-bold>Core Commands</span>
      </div>
      <div class="font-mono px-4 py-4 flex flex-col gap-3">
        <div
          v-for="(cmd, idx) in [
            { cmd: 'dataloader init', desc: 'Environment setup' },
            { cmd: 'dataloader install', desc: 'Dependency resolution' },
            { cmd: 'dataloader sync', desc: 'State synchronization' },
            { cmd: 'dataloader verify', desc: 'Dependency verification' }
          ]"
          :key="cmd.cmd"
          flex items-center gap-3
          :style="{
            transitionDelay: `${200 + idx * 150}ms`,
            transitionProperty: 'all',
            transitionDuration: '500ms'
          }"
        >
          <div
            px-3 py-1.5 rounded bg="black/30" border="1 solid sky-700"
            text-sky-300 min-w-45 text-sm
          >$ {{cmd.cmd}}</div>
          <div text-zinc-400 text-sm>{{cmd.desc}}</div>
        </div>
      </div>
    </div>
    <div
      v-if="$clicks >= 2"
      mt-4
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 2 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
    >
      <div bg="indigo-800/40" px-4 py-2 flex items-center>
        <div i-carbon:code text-indigo-300 text-xl mr-2 />
        <span font-bold>Example: Install PyTorch with CUDA</span>
      </div>
      <div class="font-mono bg-black/30 px-4 py-3 text-sm">
        <div text-green-400>$ dataloader install --cuda=11.8 --torch=2.1.0</div>
        <div text-sky-300 mt-1>[INFO] Resolving compatible C++ runtime...</div>
        <div text-sky-300>[INFO] Setting up CUDA environment...</div>
        <div text-sky-300>[INFO] Installing PyTorch dependencies...</div>
        <div text-green-400 mt-2>[SUCCESS] Environment ready in 4m32s</div>
      </div>
    </div>
  </div>

  <div
    v-click="3"
    w="1/2" pl-4
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
  >
    <div
      border="2 solid violet-800" bg="violet-800/20"
      rounded-lg overflow-hidden
    >
      <div bg="violet-800/40" px-4 py-2 flex items-center>
        <div i-carbon:tools text-violet-300 text-xl mr-2 />
        <span font-bold>Language Support</span>
      </div>
      <div px-4 py-4 grid grid-cols-2 gap-6>
        <div>
          <div flex items-center gap-2 mb-3>
            <div i-logos:python text-2xl />
            <span font-bold>Python</span>
          </div>
          <div flex flex-col gap-2 text-sm>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>pip requirements</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>conda environments</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>poetry support</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>virtualenv integration</span>
            </div>
          </div>
        </div>
        <div>
          <div flex items-center gap-2 mb-3>
            <div i-logos:c-plusplus text-2xl />
            <span font-bold>C++ & System</span>
          </div>
          <div flex flex-col gap-2 text-sm>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>CUDA versions</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>compiler toolchains</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>system libraries</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>ABI compatibility</span>
            </div>
          </div>
        </div>
      </div>
      <div
        mt-2 px-4 py-3 bg="violet-900/30"
        border-t="2 solid violet-800/50"
        flex items-center justify-between
      >
        <div flex items-center gap-2>
          <div i-carbon:application text-violet-300 />
          <span text-sm>Kubernetes Integration</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-filled text-green-400 />
          <span text-sm>Native Init Container Support</span>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 6
glow: right
---

# Smart Dependency Resolution: Solving the Version Maze

<span>Untangling the complex web of dependencies</span>

<div mt-4 />

<div flex>
  <div w="1/2" pr-6>
    <div
      v-click="1"
      relative min-h-80 border="2 solid blue-800" rounded-lg bg="blue-800/20"
      transition duration-500 ease-in-out
      :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div absolute top--3 left-4 bg="blue-700" px-3 py-0.5 rounded-full text-sm>
        Dependency Resolution Process
      </div>
      <!-- Graph visualization -->
      <svg width="100%" height="250" viewBox="0 0 400 250" class="mt-4">
        <!-- PyTorch node -->
        <circle
          :cx="200" :cy="70" :r="40"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="rgba(59, 130, 246, 0.6)"
          stroke-width="2"
          :class="{ 'animate-pulse': $clicks === 2 }"
        />
        <text x="200" y="70" text-anchor="middle" fill="white" font-size="14">PyTorch</text>
        <text x="200" y="85" text-anchor="middle" fill="white" font-size="10">2.1.0</text>
        <!-- CUDA node -->
        <circle
          :cx="100" :cy="170" :r="35"
          fill="rgba(139, 92, 246, 0.2)"
          stroke="rgba(139, 92, 246, 0.6)"
          stroke-width="2"
          :class="{ 'animate-pulse': $clicks === 3 }"
        />
        <text x="100" y="170" text-anchor="middle" fill="white" font-size="14">CUDA</text>
        <text x="100" y="185" text-anchor="middle" fill="white" font-size="10">11.8</text>
        <!-- GCC node -->
        <circle
          :cx="200" :cy="170" :r="35"
          fill="rgba(236, 72, 153, 0.2)"
          stroke="rgba(236, 72, 153, 0.6)"
          stroke-width="2"
          :class="{ 'animate-pulse': $clicks === 4 }"
        />
        <text x="200" y="170" text-anchor="middle" fill="white" font-size="14">GCC</text>
        <text x="200" y="185" text-anchor="middle" fill="white" font-size="10">9.4.0</text>
        <!-- cuDNN node -->
        <circle
          :cx="300" :cy="170" :r="35"
          fill="rgba(34, 211, 238, 0.2)"
          stroke="rgba(34, 211, 238, 0.6)"
          stroke-width="2"
          :class="{ 'animate-pulse': $clicks === 5 }"
        />
        <text x="300" y="170" text-anchor="middle" fill="white" font-size="14">cuDNN</text>
        <text x="300" y="185" text-anchor="middle" fill="white" font-size="10">8.7.0</text>
        <!-- Connection lines -->
        <line
          x1="200" y1="110" x2="100" y2="135"
          stroke="white" stroke-width="2" stroke-dasharray="4 2"
          :class="{ 'animate-pulse': $clicks === 3 }"
        />
        <line
          x1="200" y1="110" x2="200" y2="135"
          stroke="white" stroke-width="2" stroke-dasharray="4 2"
          :class="{ 'animate-pulse': $clicks === 4 }"
        />
        <line
          x1="200" y1="110" x2="300" y2="135"
          stroke="white" stroke-width="2" stroke-dasharray="4 2"
          :class="{ 'animate-pulse': $clicks === 5 }"
        />
      </svg>
    </div>
  </div>

  <div w="1/2" pl-6 flex flex-col gap-4>
    <div
      v-click="2"
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg p-4
      transition duration-500 ease-in-out
      :class="$clicks < 2 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div flex items-center>
        <div i-carbon:inspection text-indigo-300 text-xl mr-2 />
        <span font-bold>Before Installation</span>
      </div>
      <div mt-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Dependency graph analysis</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Version compatibility check</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>System requirements validation</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>C++/CUDA ABI verification</span>
        </div>
      </div>
    </div>
    <div
      v-click="6"
      border="2 solid sky-800" bg="sky-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 6 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div bg="sky-800/40" px-4 py-2 flex items-center>
        <div i-carbon:code text-sky-300 text-xl mr-2 />
        <span font-bold>Resolution Example</span>
      </div>
      <div class="font-mono bg-black/30 px-4 py-3 text-sm">
        <div text-green-400>$ dataloader install torch==2.1.0</div>
        <div text-sky-300 mt-1>[INFO] Detected CUDA requirement: 11.8</div>
        <div text-sky-300>[INFO] Detected cuDNN requirement: 8.7.0</div>
        <div text-sky-300>[INFO] Detected GCC requirement: 9.4.0</div>
        <div text-sky-300>[INFO] Building compatible environment...</div>
        <div text-sky-300 mt-1>[INFO] Downloading PyTorch 2.1.0</div>
        <div text-sky-300>[INFO] Configuring toolchain compatibility</div>
        <div text-green-400 mt-1>[SUCCESS] All dependencies resolved!</div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 6
glowSeed: 150
---

# Cache Strategy: Optimizing the Unbearable Heaviness of Builds

<span>From hours to seconds with smart caching</span>

<div mt-6 />

<div
  v-click="1"
  relative min-h-90
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    v-click="2"
    absolute top="1/2" left="1/2" -translate-x="1/2" -translate-y="1/2"
    w-90 h-90 rounded-full border="4 indigo-500/40"
    transition-all duration-1000
    :class="{ 'animate-pulse': $clicks < 6 }"
  ></div>

  <div
    v-click="3"
    absolute top="1/2" left="1/2" -translate-x="1/2" -translate-y="1/2"
    w-65 h-65 rounded-full border="4 purple-500/40"
    transition-all duration-1000
    :class="{ 'animate-pulse': $clicks < 6 }"
  ></div>

  <div
    v-click="4"
    absolute top="1/2" left="1/2" -translate-x="1/2" -translate-y="1/2"
    w-40 h-40 rounded-full border="4 pink-500/40"
    transition-all duration-1000
    :class="{ 'animate-pulse': $clicks < 6 }"
  ></div>

  <div flex justify-center>
    <div grid grid-cols-3 gap-6>
      <div
        v-click="2"
        border="2 solid indigo-800" bg="indigo-800/20"
        rounded-lg overflow-hidden
        transition-all duration-500
        :class="[
          $clicks === 2 ? 'z-10 scale-105' : '',
          $clicks >= 6 ? 'border-green-500' : ''
        ]"
      >
        <div
          bg="indigo-800/40" px-4 py-2 flex items-center
          :class="$clicks >= 6 ? 'bg-green-800/40' : ''"
        >
          <div i-carbon:archive text-indigo-300 text-xl mr-2 />
          <span font-bold>Layer 1: Downloads</span>
        </div>
        <div px-4 py-3>
          <div text-sm opacity-80>Source packages & archives</div>
          <div mt-3 flex flex-col gap-1 text-xs opacity-70>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>SHA256 verification</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Mirror fallback</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Parallel fetching</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-click="3"
        border="2 solid purple-800" bg="purple-800/20"
        rounded-lg overflow-hidden
        transition-all duration-500
        :class="[
          $clicks === 3 ? 'z-10 scale-105' : '',
          $clicks >= 6 ? 'border-green-500' : ''
        ]"
      >
        <div
          bg="purple-800/40" px-4 py-2 flex items-center
          :class="$clicks >= 6 ? 'bg-green-800/40' : ''"
        >
          <div i-carbon:assembly-cluster text-purple-300 text-xl mr-2 />
          <span font-bold>Layer 2: Builds</span>
        </div>
        <div px-4 py-3>
          <div text-sm opacity-80>Compiled binaries & wheels</div>
          <div mt-3 flex flex-col gap-1 text-xs opacity-70>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Deduplication</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Incremental builds</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>ABI versioning</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-click="4"
        border="2 solid pink-800" bg="pink-800/20"
        rounded-lg overflow-hidden
        transition-all duration-500
        :class="[
          $clicks === 4 ? 'z-10 scale-105' : '',
          $clicks >= 6 ? 'border-green-500' : ''
        ]"
      >
        <div
          bg="pink-800/40" px-4 py-2 flex items-center
          :class="$clicks >= 6 ? 'bg-green-800/40' : ''"
        >
          <div i-carbon:data-class text-pink-300 text-xl mr-2 />
          <span font-bold>Layer 3: Metadata</span>
        </div>
        <div px-4 py-3>
          <div text-sm opacity-80>Environment configs</div>
          <div mt-3 flex flex-col gap-1 text-xs opacity-70>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Dependency tracking</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Version resolution</span>
            </div>
            <div flex items-center gap-2>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Activation scripts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="5"
  mt-6 grid grid-cols-2 gap-8
  transition duration-500 ease-in-out
  :class="$clicks < 5 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-red-300 text-xl mr-2 />
      <span font-bold>Traditional Approach</span>
    </div>
    <div px-5 py-4 grid grid-cols-1 gap-3>
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-bi:gpu-card text-red-300 />
          <span>CUDA setup:</span>
        </div>
        <div text-red-400 font-bold>45-60 min</div>
      </div>
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-logos:pytorch text-red-300 />
          <span>PyTorch install:</span>
        </div>
        <div text-red-400 font-bold>20-30 min</div>
      </div>
      <div mt-2 px-4 py-2 bg="red-900/30" rounded-lg text-sm flex items-center gap-2>
        <div i-carbon:warning-alt text-red-300 />
        <span>Installation for each developer, each time</span>
      </div>
    </div>
  </div>
  <div
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
    :class="$clicks >= 6 ? 'animate-pulse' : ''"
  >
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-green-300 text-xl mr-2 />
      <span font-bold>With Datasets</span>
    </div>
    <div px-5 py-4 grid grid-cols-1 gap-3>
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-carbon:build text-green-300 />
          <span>First setup:</span>
        </div>
        <div text-green-400 font-bold>10-15 min</div>
      </div>
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-carbon:data-share text-green-300 />
          <span>Subsequent use:</span>
        </div>
        <div text-green-400 font-bold flex items-center>
          <span>seconds</span>
          <div i-carbon:flash animate-pulse ml-1 />
        </div>
      </div>
      <div mt-2 px-4 py-2 bg="green-900/30" rounded-lg text-sm flex items-center gap-2>
        <div i-carbon:checkmark-outline text-green-300 />
        <span>Build once, share with entire team</span>
      </div>
    </div>
  </div>
</div>

---
layout: center
---

# PVC Architecture: Storage Strategies for Gigabytes

<div class="mt-6 flex justify-center">
  <div class="relative w-120">
    <div v-click class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-4">
      <h3>Shared Cache Layer (JuiceFS)</h3>
      <div class="mt-2 text-sm opacity-80">
        ReadWriteMany PVC for common dependencies
      </div>
      <div class="mt-2 grid grid-cols-3 gap-2 text-xs opacity-70">
        <div>• Deduplication</div>
        <div>• Compression</div>
        <div>• Concurrent access</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div v-click class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h3>Training Workloads</h3>
        <div class="mt-2 text-sm opacity-80">
          ReadOnlyMany mount
        </div>
        <pre class="text-xs mt-2 bg-black/30 p-2 rounded">
volumes:
- name: pytorch-env
  persistentVolumeClaim:
    claimName: pytorch-env
    readOnly: true
        </pre>
      </div>
      <div v-click class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h3>Development Environment</h3>
        <div class="mt-2 text-sm opacity-80">
          ReadOnlyMany mount
        </div>
        <pre class="text-xs mt-2 bg-black/30 p-2 rounded">
volumes:
- name: pytorch-env
  persistentVolumeClaim:
    claimName: pytorch-env
    readOnly: true
        </pre>
      </div>
    </div>
  </div>
</div>

<div v-click class="mt-8 text-center">
  <div class="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <p class="text-lg">Storage efficiency: <span class="text-green-400">90% reduction</span> compared to individual environments</p>
  </div>
</div>

---
class: py-10
clicks: 4
glow: bottom
glowSeed: 338
---

# Pixi Integration: The Next Evolution

<span>Supercharging environment creation</span>

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div
    v-click="1"
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-logos:conda text-3xl mr-2 />
      <span font-bold>Traditional Conda Approach</span>
    </div>
    <div px-4 py-4 flex flex-col gap-3>
      <div flex items-center gap-2 text-red-400>
        <div i-carbon:time />
        <span>Minutes to hours for environment setup</span>
      </div>
      <div flex items-center gap-2 text-red-400>
        <div i-carbon:warning />
        <span>Sequential dependency resolution</span>
      </div>
      <div flex items-center gap-2 text-red-400>
        <div i-carbon:warning />
        <span>Incompatible ABI issues</span>
      </div>
      <div mt-2 bg="black/30" font-mono text-sm px-3 py-2 rounded>
        <div>$ conda create -n myenv python=3.10</div>
        <div>$ conda install pytorch torchvision</div>
        <div class="text-zinc-500 mt-1"># Waiting... a long time...</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between border="2 solid red-700" bg="red-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-red-300 font-bold>45+ minutes</span>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:kubernetes text-3xl mr-2 />
      <span font-bold>With Pixi Integration</span>
    </div>
    <div px-4 py-4 flex flex-col gap-3>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:rocket />
        <span>Seconds to minutes for complete setup</span>
      </div>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:checkmark-outline />
        <span>Parallel processing of dependencies</span>
      </div>
      <div flex items-center gap-2 text-green-400>
        <div i-carbon:checkmark-outline />
        <span>Precompiled binaries with correct ABI</span>
      </div>
      <div mt-2 bg="black/30" font-mono text-sm px-3 py-2 rounded>
        <div>$ dataloader init --pixi</div>
        <div>$ dataloader install --cuda=11.8 --pytorch</div>
        <div class="text-green-400 mt-1"># Ready in seconds with Pixi acceleration</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between border="2 solid green-700" bg="green-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-green-300 font-bold>4-5 minutes</span>
      </div>
    </div>
  </div>
</div>

<div
  v-click="3"
  mt-6
  transition duration-500 ease-in-out
  :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div relative w-full h-16>
    <div
      absolute top-0 left-0 right-0
      border="2 solid neutral-700" bg="neutral-800/50"
      rounded-lg px-4 py-3
    >
      <div flex items-center justify-between>
        <div font-bold text-lg>Setup Time Comparison</div>
        <div text-sm text-zinc-400>Smaller is better</div>
      </div>
    </div>
    <div absolute bottom--6 left-0 right-0 px-10>
      <div flex items-end gap-4 justify-around h-40>
        <div flex flex-col items-center gap-2>
          <div h-32 w-50 bg="red-800/40" border="2 solid red-700" rounded-t-lg flex items-center justify-center>
            <span text-xl font-bold text-red-300>45+ min</span>
          </div>
          <div text-sm>Conda</div>
        </div>
        <div flex flex-col items-center gap-2>
          <div h-16 w-50 bg="blue-800/40" border="2 solid blue-700" rounded-t-lg flex items-center justify-center>
            <span text-xl font-bold text-blue-300>20 min</span>
          </div>
          <div text-sm>Docker</div>
        </div>
        <div flex flex-col items-center gap-2>
          <div h-8 w-50 bg="green-800/40" border="2 solid green-700" rounded-t-lg flex items-center justify-center>
            <span text-xl font-bold text-green-300>5 min</span>
          </div>
          <div text-sm>Datasets + Pixi</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="4"
  mt-16 flex justify-center
  transition duration-500 ease-in-out
  :class="$clicks < 4 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    bg="green-900/30" border="2 solid green-700"
    rounded-lg py-4 px-6 text-center max-w-140
  >
    <div text-2xl font-bold text-gradient-primary>10x Faster Environment Setup</div>
    <div text-sm mt-2 opacity-80>Powered by Pixi's innovative package management and parallel processing</div>
  </div>
</div>

---
class: py-10
clicks: 5
glowSeed: 250
---

# Real World Impact: Numbers Don't Lie

<span>The measurable benefits of Datasets</span>

<div mt-4 />

<div
  v-click="1"
  grid grid-cols-3 gap-4
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    border="2 solid sky-800" bg="sky-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500
    :class="$clicks === 2 ? 'scale-110 z-10' : ''"
  >
    <div text-4xl mb-4>⚡️</div>
    <div font-bold text-xl>Environment Setup</div>
    <div
      text-sky-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>5-10x</span>
      <div i-carbon:arrow-up text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>With shared environments</div>
    <div text-xs mt-3 bg="sky-900/30" border="1 solid sky-700" rounded-lg px-3 py-1>
      From hours to minutes
    </div>
  </div>

  <div
    border="2 solid purple-800" bg="purple-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500
    :class="$clicks === 3 ? 'scale-110 z-10' : ''"
  >
    <div text-4xl mb-4>💾</div>
    <div font-bold text-xl>Storage Efficiency</div>
    <div
      text-purple-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>90%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>Using JuiceFS dedup</div>
    <div text-xs mt-3 bg="purple-900/30" border="1 solid purple-700" rounded-lg px-3 py-1>
      10GB → 1GB typical savings
    </div>
  </div>

  <div
    border="2 solid pink-800" bg="pink-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500
    :class="$clicks === 4 ? 'scale-110 z-10' : ''"
  >
    <div text-4xl mb-4>🎯</div>
    <div font-bold text-xl>Development Cycle</div>
    <div
      text-pink-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>75%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>No more environment setup</div>
    <div text-xs mt-3 bg="pink-900/30" border="1 solid pink-700" rounded-lg px-3 py-1>
      Instant environment activation
    </div>
  </div>
</div>

<div
  v-click="5"
  mt-8 grid grid-cols-2 gap-4
  transition duration-500 ease-in-out
  :class="$clicks < 5 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <div
    border="2 solid blue-800" bg="blue-800/20"
    rounded-lg p-5 flex gap-6
  >
    <div flex flex-col items-center justify-center>
      <div text-4xl>🔄</div>
    </div>
    <div flex-1>
      <div font-bold text-xl>Team Productivity</div>
      <div text-xl font-bold text-blue-300 mt-1>Consistent Environments</div>
      <div text-sm opacity-70 mt-1>Same setup for scientists and engineers</div>
      <div mt-3 flex gap-2 flex-wrap>
        <div text-xs bg="blue-900/30" border="1 solid blue-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Same versions</span>
        </div>
        <div text-xs bg="blue-900/30" border="1 solid blue-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Same behaviors</span>
        </div>
        <div text-xs bg="blue-900/30" border="1 solid blue-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>No "works on my machine"</span>
        </div>
      </div>
    </div>
  </div>
  <div
    border="2 solid indigo-800" bg="indigo-800/20"
    rounded-lg p-5 flex gap-6
  >
    <div flex flex-col items-center justify-center>
      <div text-4xl>🚀</div>
    </div>
    <div flex-1>
      <div font-bold text-xl>Model Deployment</div>
      <div text-xl font-bold text-indigo-300 mt-1>Enterprise Model Hub</div>
      <div text-sm opacity-70 mt-1>Self-contained model registry</div>
      <div mt-3 flex gap-2 flex-wrap>
        <div text-xs bg="indigo-900/30" border="1 solid indigo-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Pre-loaded models</span>
        </div>
        <div text-xs bg="indigo-900/30" border="1 solid indigo-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Ready for inference</span>
        </div>
        <div text-xs bg="indigo-900/30" border="1 solid indigo-700" rounded-lg px-2 py-1 flex items-center gap-1>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Version controlled</span>
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: center
---

# Future Roadmap: Building the Future Together

<div class="mt-6 grid grid-cols-2 gap-8">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3>Coming Soon</h3>
    <ul class="mt-4 space-y-2">
      <li>• ModelScope integration</li>
      <li>• Multi-mirror failover system</li>
      <li>• Bandwidth control & QoS</li>
      <li>• Cache prewarming for clusters</li>
      <li>• Enhanced observability</li>
    </ul>
  </div>

  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3>Long-Term Vision</h3>
    <ul class="mt-4 space-y-2">
      <li>• P2P distribution across nodes</li>
      <li>• Cross-region sync for global teams</li>
      <li>• Automated version lifecycle management</li>
      <li>• Intelligent auto-optimization</li>
      <li>• Extended language ecosystem support</li>
    </ul>
  </div>
</div>

<div class="mt-8 text-center">
  <div class="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
    <h3 class="mb-4">Join the Revolution</h3>
    <div class="grid grid-cols-3 gap-8">
      <div class="text-center">
        <div class="text-3xl mb-2">🛠️</div>
        <div class="font-semibold">Contribute</div>
        <p class="text-xs opacity-70">Help build new features</p>
      </div>
      <div class="text-center">
        <div class="text-3xl mb-2">💡</div>
        <div class="font-semibold">Suggest</div>
        <p class="text-xs opacity-70">Share your use cases</p>
      </div>
      <div class="text-center">
        <div class="text-3xl mb-2">🔗</div>
        <div class="font-semibold">Connect</div>
        <p class="text-xs opacity-70">Join our community</p>
      </div>
    </div>
  </div>
</div>

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
      <img src="/slide_qr.png" w-50 />
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
  </div>
</div>
