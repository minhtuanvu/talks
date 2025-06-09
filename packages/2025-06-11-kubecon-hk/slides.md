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

<div class="mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-1 py-0 text-left">

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
class: py-10
glowSeed: 175
---

# Development vs Training: The Environment Gap

<span>Bridging the divide between model development and production training</span>

<div mt-6 grid grid-cols-2 gap-6>
  <div
    v-click
    border="2 solid red-800" bg="red-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:warning-alt text-red-300 text-xl mr-2 />
      <span font-bold>The Common Pattern</span>
    </div>
    <div px-4 py-3 flex flex-col gap-2>
      <div flex items-center gap-2 py-1>
        <div i-carbon:development text-amber-300 text-xl />
        <div>
          <div font-bold>Development</div>
          <div text-sm opacity-80>SSH Remote / Jupyter Notebooks</div>
        </div>
      </div>
      <div flex items-center gap-2 py-1>
        <div i-carbon:machine-learning-model text-amber-300 text-xl />
        <div>
          <div font-bold>Training</div>
          <div text-sm opacity-80>Separate pods/containers</div>
        </div>
      </div>
      <div mt-2 bg="red-900/30" rounded-lg p-3 text-sm>
        <div font-bold mb-1>Slurm-style Install Pattern</div>
        <div font-mono text-xs text-zinc-300 bg="black/30" p-2 rounded>
          <div># In training script or job</div>
          <div>pip install -r requirements.txt</div>
          <div>python train.py</div>
        </div>
        <div mt-2 grid grid-cols-2 gap-2>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Dependency drift</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Repeated downloads</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>No lockfile tracking</span>
          </div>
          <div flex items-center gap-1 text-xs>
            <div i-carbon:close text-red-400 />
            <span>Inconsistent versions</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click
    border="2 solid green-800" bg="green-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:cloud-service-management text-green-300 text-xl mr-2 />
      <span font-bold>The Dataset Solution</span>
    </div>
    <div px-4 py-3 flex flex-col gap-2 h-full>
      <div bg="green-900/30" rounded-lg p-3 flex flex-col gap-2>
        <div font-bold text-sm>Single Environment, Multiple Contexts</div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Define once, use everywhere</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Tracked dependencies with lockfiles</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span text-sm>Automatic dependency resolution</span>
        </div>
      </div>
      <div bg="green-900/30" rounded-lg p-3 mt-1 h-40>
        <div font-bold text-sm mb-2>Automatic Tool Integration</div>
        <div grid grid-cols-2 gap-2 h-16>
          <div flex items-center justify-center gap-2 bg="black/20" rounded p-2>
            <div i-logos:jupyter text-xl min-w-7 />
            <div text-xs>
              <div font-bold>Jupyter</div>
            </div>
          </div>
          <div flex items-center justify-center gap-2 bg="black/20" rounded p-2>
            <div i-logos:visual-studio-code text-xl min-w-7 />
            <div text-xs>
              <div font-bold>VSCode</div>
            </div>
          </div>
        </div>
        <div text-xs text-center mt-2 text-green-300>No configuration needed - just click and use!</div>
      </div>
    </div>
  </div>
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
    border="2 solid yellow-800" bg="yellow-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:cics-program text-yellow-300 h-20 w-20 />
    </div>
    <div bg="yellow-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>ABI Incompatibility</span>
    </div>
  </div>
  <div
    :class="$clicks < 2 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid lime-800" bg="lime-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-bi:gpu-card text-lime-300 h-20 w-20 />
    </div>
    <div bg="lime-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>CUDA Version Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 3 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid emerald-800" bg="emerald-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:terminal text-emerald-300 h-20 w-20 />
    </div>
    <div bg="emerald-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
      <span>System Library Conflicts</span>
    </div>
  </div>
  <div
    :class="$clicks < 4 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
    rounded-lg
    border="2 solid sky-800" bg="sky-800/20"
    backdrop-blur
    flex-1 h-full
    transition duration-500 ease-in-out
  >
    <div px-2 py-12 flex items-center justify-center>
      <div i-carbon:row-delete text-sky-300 h-20 w-20 />
    </div>
    <div bg="sky-800/30" w-full px-4 py-2 h="5rem" flex items-center justify-center text-center>
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
class: py-10
clicks: 4
glowSeed: 180
---

# The Hidden Iceberg: What pip Can't See

<span>The deceptive simplicity of Python dependencies</span>

<div mt-8 />

<div flex>
  <div
    v-click="1"
    w="1/2 pr-6"
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-x--20' : 'opacity-100 translate-x-0'"
  >
    <div relative h-90 w-90>
      <!-- Iceberg water effect -->
      <div
        absolute bottom-0 w-full bg="blue-500/20" h-60 rounded-t-full
        class="animate-name-pulse animate-iteration-count-[infinite] animate-direction-normal animate-duration-8000 animate-ease-in-out"
      ></div>
      <!-- Visible part -->
      <div
        absolute top-0 w-90
        transition duration-500 ease-in-out
        :class="$clicks === 2 ? 'scale-110 z-10' : ''"
      >
        <div border="2 solid sky-800" bg="sky-800/20" backdrop-blur rounded-lg p-3>
          <div flex items-center mb-4>
            <div i-carbon:cloud-ceiling text-sky-300 text-xl mr-2 />
            <span font-bold>Seems installing</span>
          </div>
          <div
            font-mono text-sm px-4 py-3 bg="black/30" rounded-lg
            border="1 solid sky-700"
          >
            torch==2.1.0
            transformers==4.36.0
            accelerate==0.25.0
          </div>
        </div>
      </div>
      <!-- Hidden part -->
      <div
        v-click="2"
        absolute bottom-0 w-90
        transition duration-500 ease-in-out
        :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
      >
        <div border="2 solid blue-800" bg="blue-800/20" backdrop-blur rounded-lg p-3>
          <div flex items-center mb-4>
            <div i-carbon:ibm-cloud-secrets-manager text-blue-300 text-xl mr-2 />
            <span font-bold>But actually...</span>
          </div>
          <div
            font-mono text-xs px-3 py-3 bg="black/30" rounded-lg
            border="1 solid blue-700" max-h-40 overflow-y-auto
          >
            <div text-blue-300>CUDA 11.8</div>
            <div>gcc 9.4.0</div>
            <div>cmake 3.22.1</div>
            <div>libnccl2</div>
            <div>libcudnn8</div>
            <div>cuda-cupti-dev</div>
            <div>libstdc++.so.6</div>
            <div>libopenblas.so</div>
            <div>libpython3.10.so</div>
            <div>libcublas.so</div>
            <div text-zinc-500>...and dozens more</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div w="1/2">
    <div
      v-click="3"
      border="2 solid violet-800" bg="violet-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 3 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div bg="violet-800/40" px-3 py-2 flex items-center>
        <div i-logos:python text-xl mr-2 />
        <span text-sm font-bold>Python Package Managers</span>
      </div>
      <div px-3 py-3 flex flex-col gap-1 text-sm>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:checkmark-outline text-green-400 min-w-5 />
          <span>Handle Python dependencies well</span>
        </div>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:close text-red-400 min-w-5 />
          <span>Blind to underlying C++ libraries</span>
        </div>
        <div flex items-center gap-2 text-nowrap>
          <div i-carbon:close text-red-400 min-w-5 />
          <span>Cannot handle compiler compatibility</span>
        </div>
      </div>
    </div>
    <div
      v-click="4"
      mt-4 border="2 solid yellow-800" bg="yellow-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 4 ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'"
    >
      <div bg="yellow-800/40" px-3 py-2 flex items-center text-sm>
        <div i-carbon:warning-alt text-yellow-300 text-xl mr-2 />
        <span font-bold>The Reality</span>
      </div>
      <div px-4 py-3>
        <div text-xs opacity-80>
          Modern ML libraries are just thin Python wrappers around massive C++ and CUDA codebases
        </div>
        <div flex items-center gap-2 mb-2 mt-8>
            <div i-carbon:chart-relationship text-yellow-300 />
            <span font-bold>Dependency Complexity</span>
          </div>
          <div flex justify-between text-xs>
            <div>PyTorch source:</div>
            <div text-yellow-300>1.8M+ lines of C++</div>
          </div>
          <div flex justify-between text-xs>
            <div>Python wrapper:</div>
            <div text-yellow-300>~100K lines of Python</div>
          </div>
          <div flex justify-between text-xs>
            <div>Binary size:</div>
            <div text-yellow-300>1.7GB+ with CUDA</div>
          </div>
      </div>
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

<div mt-4 />

<div flex justify-center>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    grid grid-cols-3 gap-8 w-full text-sm
  >
    <div
      v-click="1"
      border="2 solid yellow-800" bg="yellow-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="yellow-800/40" px-4 py-3 flex items-center>
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
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="cyan-800/40" px-4 py-3 flex items-center>
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
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="blue-800/40" px-4 py-3 flex items-center>
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
  mt-4 transition-all duration-500
  :class="$clicks < 4 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
>
  <div flex items-center justify-center>
    <div relative>
      <div
        border="2 solid green-800" bg="green-800/20"
        rounded-lg p-4 w-full
      >
        <div text-center font-bold text-xl mb-3>What We Need</div>
        <div grid grid-cols-3 gap-4>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Python package management</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>C++/CUDA awareness</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Storage efficiency</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Fast setup times</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>K8s native</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-nowrap>Team consistency</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
glowSeed: 12129
---

# Introducing Datasets

Python + C++ Harmony in K8S

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

# Dataset CRD

One CRD to Rule Them All

<div class="flex relative">

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
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
glowSeed: 182
clicks: 4
---

# How does it work?

<span>Looking under the hood</span>

<div mt-8 />

<div flex>
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
          'Create/update PVC(Any CSI)',
          'Download/sync data from source to PV',
          'Configure mount options',
          'Update dataset status'
        ]"
        :key="step"
        flex items-center gap-2 py-1
        :class="$clicks < 1 ? 'opacity-0' : 'opacity-100'"
        :style="{ transitionDelay: `${200 + idx * 100}ms`, transitionProperty: 'all', transitionDuration: '500ms' }"
      >
        <div i-carbon:dot-mark text-blue-300 />
        <span>{{step}}</span>
      </div>
    </div>
  </div>
</div>

<!--
Okay, let's take a look at how the CRD works once it is created.

[click] First, we parse and validate your spec - making sure everything's properly defined. Then we check what type of source and handle any credentials securely.

[click] Here's where it gets interesting - we create a PVC, We are almost compatible with all CSIs.

[click] Then we deploy a job - downloading your models, setting up your conda environment, installing all those libraries. Once it's done, your dataset is ready to be mounted by any pod.

[click] The beauty is - this happens once. After that, everyone just mounts the ready-to-use environment. No more waiting!
-->

---
class: py-4
glowSeed: 310
---

<div mt-6 />

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
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

<div v-click class="absolute right-18 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
    <div text-lg>Python Environment Management</div>
    <span class="text–neutral-500 text-xs">From dependency chaos to environment harmony</span>
    <div>
      <div px-0 py-2 flex flex-col gap-2>
        <div grid grid-cols-2 gap-2>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <div i-logos:conda text-xl />
              <span font-bold></span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Full environment control</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>CUDA integration</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>C++ binary packages</span>
            </div>
          </div>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <div i-logos:python text-xl />
              <span font-bold>pip</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Familiar requirements.txt</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>PyPI packages</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Private indexes</span>
            </div>
          </div>
        </div>
        <div grid grid-cols-2 gap-2>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <img src="/pixi.png" w-6 />
              <span font-bold>Pixi</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Fast parallel installs</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Rust-powered speed</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Lockfile support</span>
            </div>
          </div>
          <div
            flex flex-col gap-2 rounded-lg bg="neutral-900/30"
            p-3 border="1 solid neutral-700"
          >
            <div flex items-center gap-2>
              <span font-bold>Mamba</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>10x faster than conda</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Parallel downloads</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Conda-compatible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Here's the same Dataset spec, but now I want to highlight something really important - we support multiple package managers!

[click] You can use conda for full environment control with CUDA integration. Need something from PyPI? No problem, just add it to your pip requirements. Want blazing fast installs? We've got Pixi integration - it's Rust-powered and incredibly fast. Or if you prefer, use Mamba which is 10x faster than traditional conda.

The key is flexibility - use whatever works best for your workflow. We handle all the complexity behind the scenes, making sure everything plays nicely together.
-->

---
class: py-4
glowSeed: 275
---

<div mt-6 />

<div class="mt-2 w-75%">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: qwen3-32b
spec:
  dataSyncRound: 1
  secretRef: dataset-hf-qwen3-32b-secret
  source:
    options:
      endpoint: https://hf-mirror.com
      repoType: MODEL
    type: HUGGING_FACE
    uri: huggingface://Qwen/Qwen3-32B
  volumeClaimTemplate:
    metadata: {}
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: '0'
      storageClassName: juicefs-no-share-sc
    status: {}
```

</div>
</div>

<div v-click class="absolute right-18 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
    <div text-lg>HuggingFace & ModelScope</div>
    <span class="text–neutral-500 text-xs">Models, datasets, all in one</span>
    <div
      mt-4
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
    >
      <div bg="cyan-800/40" px-2 py-2 flex items-center>
        <div i-carbon:filter text-cyan-300 text-xl mr-2 />
        <span font-bold text-sm>Smart Filtering</span>
      </div>
      <div p-2 flex items-center gap-6>
        <div flex flex-col gap-2 flex-1>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-xs text-nowrap>Include/exclude patterns</span>
          </div>
          <div flex items-center gap-2>
            <div i-carbon:checkmark-outline text-green-400 />
            <span text-xs text-nowrap>Skip redundant files</span>
          </div>
        </div>
        <div flex-1 font-mono text-xs bg="black/30" rounded-lg px-3 py-2 text="[10px]">
          <div>options:</div>
          <!-- <div>  <span text-green-300>include: "*.safetensors"</span></div> -->
          <div>  <span text-green-300>&nbsp;&nbsp;exclude: "*.bin"</span></div>
        </div>
      </div>
    </div>
    <div
      mt-4
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
    >
      <div bg="indigo-800/40" px-2 py-2 flex items-center>
        <div i-carbon:delivery text-indigo-300 text-xl mr-2 />
        <span font-bold text-sm>Advanced Features</span>
      </div>
      <div p-2 flex flex-col gap-2>
        <div grid grid-cols-2 gap-4>
          <div flex flex-col gap-2 bg="indigo-900/30" rounded-lg p-3>
            <div font-bold text-sm>Mirroring Support</div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Configurable endpoints</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Regional mirrors</span>
            </div>
            <div text-xs font-mono bg="black/30" rounded px-2 py-1 mt-1 border="1 solid indigo-700">
              <div>endpoint: https://hf-mirror.com</div>
            </div>
          </div>
          <div flex flex-col gap-2 bg="indigo-900/30" rounded-lg p-3>
            <div font-bold text-sm>Token Authentication</div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Secure token management</span>
            </div>
            <div text-xs flex items-center gap-1>
              <div i-carbon:checkmark-outline text-green-400 />
              <span>Private repo access</span>
            </div>
            <div text-xs font-mono bg="black/30" rounded px-2 py-1 mt-1 border="1 solid indigo-700">
              <div>secretRef: hf-token-secret</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
But Datasets isn't just about Python environments - it's also about models and data! Here's an example of loading a model from HuggingFace.

[click] Look at this - we're pulling the Qwen 32B model directly from HuggingFace. But here's where it gets smart - see those filtering options? You can exclude the files you need.

And check out those advanced features - need to use a regional mirror because HuggingFace is slow in your region? Just change the endpoint. Got private models? We handle token authentication securely through Kubernetes secrets.

This means you can have your models ready and waiting, right alongside your environments. No more downloading gigabytes every time you start an inference or job!
-->

---
class: py-10
glowSeed: 215
---

# How many?

<span>Flexible multi-source data integration</span>

<div mt-8 />

<div flex flex-col items-center>
  <div
    grid grid-cols-3 gap-6
    w-full max-w-200
  >
    <!-- Card 1: ML Model Repositories -->
    <div
      v-click="1"
      border="2 solid sky-800" bg="sky-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 1? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="sky-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>ML Model Repositories</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-logos:hugging-face-icon text-3xl w-10 />
          <div>
            <div font-semibold>HuggingFace</div>
            <div text-xs text-zinc-400>Models, datasets, spaces</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <img src="/modelscope-color.svg" w-10 />
          <div>
            <div font-semibold>ModelScope</div>
            <div text-xs text-zinc-400>Alibaba AI models</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card 2: Environment & Package Sources -->
    <div
      v-click="2"
      border="2 solid purple-800" bg="purple-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 2 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="purple-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>Environment & Packages</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-logos:conda w-10 />
          <div>
            <div font-semibold text-base>Conda</div>
            <div text-xs text-zinc-400>Environment management</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <img src="/pixi.png" w-10 />
          <div>
            <div font-semibold text-base>Pixi</div>
            <div text-xs text-zinc-400>Environment management</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-logos:python w-10 />
          <div>
            <div font-semibold text-base>PyPI / pip</div>
            <div text-xs text-zinc-400>Python packages</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card 3: Storage & Version Control -->
    <div
      v-click="3"
      border="2 solid indigo-800" bg="indigo-800/20"
      rounded-lg overflow-hidden
      transition duration-500 ease-in-out
      :class="$clicks < 3 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
    >
      <div bg="indigo-800/40" px-4 py-2 flex items-center justify-center text-sm>
        <span font-bold>Storage & Version Control</span>
      </div>
      <div px-4 py-4 flex flex-col gap-3>
        <div flex items-center gap-3>
          <div i-simple-icons:github text-3xl text="white" w-10 />
          <div>
            <div font-semibold text-base>Git Repositories</div>
            <div text-xs text-zinc-400>Code and configurations</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-logos:aws-s3 text-3xl w-10 />
          <div>
            <div font-semibold text-base>S3-compatible</div>
            <div text-xs text-zinc-400>Cloud storage</div>
          </div>
        </div>
        <div flex items-center gap-3>
          <div i-carbon:data-volume text-3xl text-blue-300 w-10 />
          <div>
            <div font-semibold text-base>Local Volumes</div>
            <div text-xs text-zinc-400>On-prem storage</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-click="4"
    mt-6 flex justify-center
    transition duration-500 ease-in-out
    :class="$clicks < 4 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      bg="sky-900/30"
      rounded-lg py-3 px-6 text-center flex items-center gap-3
    >
      <div i-carbon:connection text-green-300 text-2xl />
      <div>
        <div text-xl font-bold>Unified Data Access Layer</div>
        <div text-sm mt-1>One consistent API to access all your AI assets</div>
      </div>
    </div>
  </div>
</div>

<!--
So how many sources do we support? Well, let me show you!

[click] First, we've got all the ML model repositories - HuggingFace, ModelScope for our friends in China. Whatever your team is using, we've got you covered.

[click] Then there's environment and package sources - Conda, Pixi, PyPI. Mix and match as needed.

[click] And for storage - Git repos for your code, S3-compatible storage for your data, local volumes for on-prem deployments.

[click] But here's the real beauty - it's all through one unified API. You don't need to learn different tools for different sources. Just define your Dataset, and we handle the rest. It's like having a universal translator for all your AI assets!
-->

---
class: py-10
glowSeed: 185
---

# The Real Problem: Collaboration at Scale

<span>When every team becomes an island</span>

<div mt-6 />

<div flex items-center justify-center gap-8>
  <div
    v-click="1"
    flex flex-col items-center
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      border="2 solid red-800" bg="red-800/20"
      rounded-lg p-6 w-100
    >
      <div flex items-center mb-4>
        <div i-carbon:warning-alt text-red-300 text-2xl mr-2 />
        <span font-bold text-xl>The Isolation Problem</span>
      </div>
      <div grid grid-cols-2 gap-4>
        <!-- Team 1 -->
        <div bg="red-900/30" rounded-lg p-3>
          <div flex items-center gap-2 mb-2>
            <div i-carbon:group text-amber-300 />
            <span font-semibold>Team A</span>
          </div>
          <div text-sm space-y-1>
            <div flex items-center gap-1>
              <div i-carbon:document text-xs />
              <span text-xs>llama-3-70b-instruct</span>
            </div>
            <div flex items-center gap-1>
              <div i-carbon:cube text-xs />
              <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
            </div>
            <div text-xs text-red-300 mt-2>Storage: 160GB</div>
          </div>
        </div>
        <!-- Team 2 -->
        <div bg="red-900/30" rounded-lg p-3>
          <div flex items-center gap-2 mb-2>
            <div i-carbon:group text-blue-300 />
            <span font-semibold>Team B</span>
          </div>
          <div text-sm space-y-1>
            <div flex items-center gap-1>
              <div i-carbon:document text-xs />
              <span text-xs>llama-3-70b-instruct</span>
            </div>
            <div flex items-center gap-1>
              <div i-carbon:cube text-xs />
              <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
            </div>
            <div text-xs text-red-300 mt-2>Storage: 160GB</div>
          </div>
        </div>
      </div>
      <div mt-3 text-center>
        <span text-xl text-red-400 font-bold>Same model, same env</span>
        <div text-sm text-red-300>Downloaded twice, stored twice!</div>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    flex items-center
    transition duration-500 ease-in-out
    :class="$clicks < 2 ? 'opacity-0' : 'opacity-100'"
  >
    <div i-carbon:arrow-right text-4xl text-green-400 animate-pulse />
  </div>

  <div
    v-click="3"
    flex flex-col items-center
    transition duration-500 ease-in-out
    :class="$clicks < 3 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
  >
    <div
      border="2 solid green-800" bg="green-800/20"
      rounded-lg p-6 w-100
    >
      <div flex items-center mb-4>
        <div i-carbon:share-knowledge text-green-300 text-2xl mr-2 />
        <span font-bold text-xl>The Sharing Solution</span>
      </div>
      <div bg="green-900/30" rounded-lg p-3 mb-3>
        <div flex items-center gap-2 mb-2>
          <div i-carbon:data-share text-green-300 />
          <span font-semibold>Shared Dataset</span>
        </div>
        <div text-sm space-y-1>
          <div flex items-center gap-1>
            <div i-carbon:document text-xs />
            <span text-xs>llama-3-70b-instruct</span>
          </div>
          <div flex items-center gap-1>
            <div i-carbon:cube text-xs />
            <span text-xs>PyTorch 2.1 + CUDA 11.8</span>
          </div>
          <div text-xs text-green-300 mt-2>Storage: 160GB (once!)</div>
        </div>
      </div>
      <div grid grid-cols-2 gap-2>
        <div flex items-center gap-1 text-sm>
          <div i-carbon:link text-green-400 />
          <span>Team A → uses reference</span>
        </div>
        <div flex items-center gap-1 text-sm>
          <div i-carbon:link text-green-400 />
          <span>Team B → uses reference</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="3"
  mt-6 flex justify-center
  transition duration-500 ease-in-out
  :class="$clicks < 3 ? 'opacity-0' : 'opacity-100'"
>
  <div bg="blue-900/30" border="2 solid blue-800" rounded-lg px-5 py-3>
    <div flex items-center gap-3>
      <div i-carbon:analytics text-blue-300 text-2xl />
      <div>
        <div text-lg font-bold>Enterprise Impact</div>
        <div text-sm>10 teams × 160GB model = <span text-red-400 line-through>1.6TB</span> → <span text-green-400>160GB</span></div>
      </div>
    </div>
  </div>
</div>

<!--
Now, let me show you why sharing is so important. This is a real scenario we see all the time.

[click] Team A downloads Llama 3, sets up their PyTorch environment with CUDA - 160GB of storage. Team B needs the same model, same environment - boom, another 160GB. Same model, same environment, but stored twice!

Now imagine you have 10 teams doing this. That's 1.6 terabytes for the same model! It's insane!

[click] [click]

But with Dataset sharing, we store it once, and everyone just references it. One model, one storage footprint, everyone benefits. This is how we turn chaos into collaboration!
-->

---

# Cross-Namespace Dataset Sharing

<div class="flex relative">

<div class="mt-2 w-75%" v-click>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg pl-1 pr-1">

```yaml {7-9}
apiVersion: dataset.baizeai.io/v1alpha1
kind: Dataset
metadata:
  name: llama3-foundation-ref
  namespace: nlp-team
spec:
  source:
    type: REFERENCE
    uri: dataset://ml-platform/llama3-70b-foundation
```
```yaml {10-11}
---
apiVersion: v1
kind: Pod
metadata:
  name: fine-tuning-job
spec:
  ...
  volumes:
  - name: model
    persistentVolumeClaim:
      claimName: llama3-foundation-ref  # Auto-created PVC
```
  </div>
</div>

<div v-click class="absolute right-0 top-25">
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
    <div text-xl text-neutral-300>How It Works</div>
    <ul class="mt-4 space-y-2 text-sm">
      <li>• Reference points to shared dataset</li>
      <li>• Controller auto-creates local PVC & PV</li>
      <li>• No data duplication</li>
      <li>• Instant access to models</li>
    </ul>
  </div>
</div>

</div>

<!--
Here's how teams actually use shared datasets. It's beautifully simple!

[click] The NLP team just creates a reference - see that REFERENCE type? They're pointing to the dataset in the ml-platform namespace. Our controller automatically creates a PVC for them, backed by the same JuiceFS data. No copying, no downloading, just instant access!

And look how naturally it fits into your existing workflow - you just mount it like any other PVC. Your training pods don't even know they're using a shared dataset. It's completely transparent!

[click] The benefits are huge - zero download time because the data is already there, 90% storage reduction across your org, and you still maintain namespace isolation for security. It's the best of both worlds!
-->

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
            <div flex items-center text="[10px]" text-zinc-400 pl-24>
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
            <div flex items-center text="[10px]" text-zinc-400 pl-24>
              <div w-10 text-center>Mount</div>
            </div>
          </div>
          <!-- Time saved indicator -->
          <div absolute right-8 top="1/2" transform translate-y="-1/2" flex flex-col items-center>
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
    flex items-center bg="green-900/30"
    rounded-lg py-3 px-6 gap-4
  >
    <div i-carbon:transform-moving text-green-300 text-3xl />
    <div>
      <div text-xl font-bold>From <span text-red-400>isolated silos</span> to <span text-green-400>unified model ecosystem</span></div>
      <div text-sm text-zinc-300 mt-1>Enabling seamless collaboration across data science teams</div>
    </div>
  </div>
</div>

<!--
So what does all this sharing and caching give us? An enterprise model hub in minutes!

[click] Look at this - you've got all your models organized, version controlled, with metadata automatically extracted. No more "which version of Llama are we using?" conversations.

[click] And the time savings? Incredible! What used to take hours - setting up environments, downloading models, configuring CUDA - now takes 30 seconds. Just mount and go! That's a 95% time reduction!

[click] This transforms how teams work. Instead of isolated silos where every team maintains their own model zoo, you get a unified ecosystem where teams can discover, share, and build on each other's work. This is how you accelerate AI development across your entire organization!
-->

---
class: py-10
clicks: 3
glowSeed: 150
---

# Intelligent Cache Strategy

<div flex justify-between items-center>
  <span w="1/2">Optimizing the unbearable heaviness of builds</span>
  <div i-carbon:cache text-7xl />
</div>

<div mt-6 grid grid-cols-3 gap-4>
  <div
    v-click="1"
    border="2 solid indigo-800" bg="indigo-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="indigo-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:archive text-indigo-300 text-xl mr-2 />
      <span font-bold>Layer 1: Downloads</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Source packages & archives</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>SHA256 verification</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Mirror fallback</span>
      </div>
    </div>
  </div>

  <div
    v-click="2"
    border="2 solid purple-800" bg="purple-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="purple-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:assembly-cluster text-purple-300 text-xl mr-2 />
      <span font-bold>Layer 2: Builds</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Compiled binaries & wheels</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Deduplication</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Incremental builds</span>
      </div>
    </div>
  </div>

  <div
    v-click="3"
    border="2 solid pink-800" bg="pink-800/20"
    rounded-lg overflow-hidden
  >
    <div bg="pink-800/40" px-4 py-2 flex items-center justify-center>
      <div i-carbon:data-class text-pink-300 text-xl mr-2 />
      <span font-bold>Layer 3: Metadata</span>
    </div>
    <div px-3 py-3 flex flex-col gap-1>
      <div text-sm opacity-80>Environment configs</div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Dependency tracking</span>
      </div>
      <div flex items-center gap-1 text-xs>
        <div i-carbon:checkmark-outline text-green-400 />
        <span>Version resolution</span>
      </div>
    </div>
  </div>
</div>

<div v-click mt-4 grid grid-cols-2 gap-4>
  <div border="2 solid red-800" bg="red-800/20" rounded-lg overflow-hidden>
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-red-300 text-xl mr-2 />
      <span font-bold>Traditional Approach</span>
    </div>
    <div px-4 py-3 flex flex-col gap-1>
      <div flex items-center justify-between>
        <div>CUDA setup:</div>
        <div text-red-400 font-bold>45-60 min</div>
      </div>
      <div flex items-center justify-between>
        <div>PyTorch install:</div>
        <div text-red-400 font-bold>20-30 min</div>
      </div>
    </div>
  </div>

  <div border="2 solid green-800" bg="green-800/20" rounded-lg overflow-hidden>
    <div bg="green-800/40" px-4 py-2 flex items-center>
      <div i-carbon:time text-green-300 text-xl mr-2 />
      <span font-bold>With Datasets</span>
    </div>
    <div px-4 py-3 flex flex-col gap-1>
      <div flex items-center justify-between>
        <div>First setup:</div>
        <div text-green-400 font-bold>10-15 min</div>
      </div>
      <div flex items-center justify-between>
        <div>Subsequent use:</div>
        <div text-green-400 font-bold flex items-center>
          <span>seconds</span>
          <div i-carbon:flash animate-pulse ml-1 />
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 3
glowSeed: 338
---

# Pixi Integration: The Next Evolution

Supercharging environment creation

<div mt-6 />

<div grid grid-cols-2 gap-6>
  <div
    v-click="1"
    border="2 solid lime-800" bg="lime-800/20"
    rounded-lg overflow-hidden
    transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'"
  >
    <div bg="lime-800/40" px-4 py-4 flex items-center>
      <div i-logos:conda text-xl />
    </div>
    <div px-4 py-4 flex flex-col gap-2>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:time />
        <span>Minutes to hours for environment setup</span>
      </div>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:warning />
        <span>Sequential dependency resolution</span>
      </div>
      <div flex items-center gap-2 text-yellow-400>
        <div i-carbon:warning />
        <span>Incompatible ABI issues</span>
      </div>
      <div mt-2 bg="black/30" font-mono text-sm px-3 py-2 rounded>
        <div>$ conda create -n myenv python=3.12</div>
        <div>$ conda install cuda -c nvidia</div>
        <div>$ conda activate myenv</div>
        <div>$ pip install torch</div>
        <div class="text-zinc-500 mt-1"># Waiting... a long time... up to hours</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between bg="lime-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-lime-300 font-bold>60+ minutes</span>
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
    <div bg="green-800/40" px-4 py-3 flex items-center>
      Pixi.sh
    </div>
    <div px-4 py-4 flex flex-col gap-2>
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
        <div>$ pixi init</div>
        <div>$ pixi project channel add nvidia</div>
        <div>$ pixi add cuda python=3.12</div>
        <div>$ pixi add --pypi torch</div>
        <div class="text-green-400 mt-1"># Ready in seconds</div>
      </div>
      <div
        v-if="$clicks >= 3"
        mt-2 flex items-center justify-between bg="green-900/20" rounded-lg p-2
      >
        <span text-sm>Average setup time:</span>
        <span text-green-300 font-bold>4-5 minutes</span>
      </div>
    </div>
  </div>
</div>

---
class: py-10
clicks: 2
glowSeed: 338
---

# Pixi Integration: How Fast?

100x difference in environment setup times!

<div mt-4 />

<div
  v-click
  transition duration-500 ease-in-out
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <!-- Chart container with proper dimensions -->
  <div relative h-100 w-full>
    <!-- Chart header -->
    <div
      border="2 solid neutral-700" bg="neutral-800/50"
      rounded-t-lg px-3 py-2
    >
      <div flex items-center justify-between>
        <div flex items-center gap-2>
          <div i-carbon:chart-column text-xl text-sky-300 />
          <div font-bold text-xs>Setup Time Comparison</div>
        </div>
        <div text-sm text-zinc-400>Smaller is better</div>
      </div>
    </div>
    <!-- Chart bars -->
    <div
      border-x="2 solid neutral-700" border-b="2 solid neutral-700"
      bg="neutral-900/50" rounded-b-lg px-3 pb-3 h-90 pt-6
    >
      <div flex items-end justify-center gap-20 h-full>
        <!-- Conda bar -->
        <div flex flex-col items-center justify-end h-full>
          <div h="75%" w-30 bg="red-800/40" rounded-t-lg flex items-center justify-center relative>
            <span text-2xl font-bold text-red-300>45+</span>
            <span text-sm text-red-300 absolute top-2 right-2>min</span>
            <div absolute top="-10" w-full flex justify-center>
              <div bg="red-900/60" border="2 solid red-700" rounded-full px-2 py-1 text-xs flex items-center text-nowrap w-fit>
                ~100× slower
              </div>
            </div>
          </div>
          <div py-2 font-semibold>Conda</div>
          <div text-xs text-zinc-400 flex items-center gap-1>
            <div i-carbon:warning-alt text-red-300 />
            <span>Sequential installation</span>
          </div>
        </div>
        <!-- Docker bar -->
        <div flex flex-col items-center>
          <div h="31%" w-30 bg="blue-800/40" rounded-t-lg flex items-center justify-center relative>
            <span text-2xl font-bold text-blue-300>20</span>
            <span text-sm text-blue-300 absolute top-2 right-2>min</span>
            <div absolute top="-10" w-full flex justify-center>
              <div bg="blue-900/60" border="2 solid blue-700" rounded-full px-3 py-1 text-xs flex items-center text-nowrap w-fit>
                ~40× slower
              </div>
            </div>
          </div>
          <div py-2 font-semibold>Docker</div>
          <div text-xs text-zinc-400 flex items-center gap-1>
            <div i-carbon:warning-alt text-blue-300 />
            <span>Build & image size issues</span>
          </div>
        </div>
        <!-- Datasets + Pixi bar -->
        <div flex flex-col items-center>
          <div
            h-10 w-30 bg="green-800/40"
            rounded-t-lg flex items-center justify-center relative
            class="animate-name-pulse animate-iteration-count-[infinite] animate-direction-normal animate-duration-3000 animate-ease-in-out"
          >
            <span text-2xl font-bold text-green-300>~30</span>
            <span text-sm text-green-300 absolute top-2 right-2>sec</span>
            <div absolute top="-10" left="0" w-full flex justify-center>
              <div bg="green-900/60" border="2 solid green-700" rounded-full px-3 py-1 text-xs flex items-center text-nowrap w-fit>
                <div i-carbon:flash text-yellow-300 inline-block />
                Fastest
              </div>
            </div>
          </div>
          <div py-2 font-semibold>Dataset + Pixi</div>
          <div text-xs text-green-400 flex items-center gap-1>
            <div i-carbon:checkmark-outline />
            <span>Parallel processing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---
class: py-10
glowSeed: 250
---

# Metrics in summary

<span>The measurable benefits of Datasets</span>

<div mt-4 />

<div
  grid grid-cols-3 gap-4
  transition duration-500 ease-in-out h-90
  :class="$clicks < 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'"
>
  <v-clicks>
  <div
    border="2 solid sky-800" bg="sky-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div text-4xl mb-4 h-45 flex items-center justify-center>⚡️</div>
    <div font-bold text-xl>Environment Setup</div>
    <div
      text-sky-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>5-10x</span>
      <div i-carbon:arrow-up text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>With shared environments</div>
    <div text-xs mt-3 bg="sky-900/30" rounded-lg px-3 py-1>
      From hours to minutes
    </div>
  </div>

  <div
    border="2 solid purple-800" bg="purple-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div text-4xl mb-4 h-45 flex items-center justify-center>💾</div>
    <div font-bold text-xl>Storage Efficiency</div>
    <div
      text-purple-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>90%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>Using JuiceFS dedup</div>
    <div text-xs mt-3 bg="purple-900/30" rounded-lg px-3 py-1>
      10GB → 1GB typical savings
    </div>
  </div>

  <div
    border="2 solid pink-800" bg="pink-800/20"
    rounded-lg p-5 flex flex-col items-center
    transition-all duration-500 h-full
  >
    <div text-4xl mb-4 h-45 flex items-center justify-center>🎯</div>
    <div font-bold text-xl>Development Cycle</div>
    <div
      text-pink-300 text-2xl font-bold mt-2
      flex items-center gap-1
    >
      <span>75%</span>
      <div i-carbon:arrow-down text-green-400 />
    </div>
    <div text-sm opacity-70 mt-1>No more environment setup</div>
    <div text-xs mt-3 bg="pink-900/30" rounded-lg px-3 py-1>
      Instant environment activation
    </div>
  </div>
  </v-clicks>
</div>

---
class: py-10
---

# Let's build it together

<span>Open sourced, already</span>

<div flex>
  <div
    v-click="1" flex flex-col items-start transition duration-500 ease-in-out
    :class="$clicks < 1 ? 'translate-x--20 opacity-0' : 'translate-x-0 opacity-100'"
  >
    <div mt-10 flex gap-16>
      <img src="/datasets-repository-qr.png" w-60 />
      <div text-2xl flex items-center gap-2 mt-4>
        <div i-ri:github-fill /><span underline decoration-dashed font-mono decoration-zinc-300>BaizeAI/dataset</span>
      </div>
    </div>
  </div>
</div>

<div w-full absolute bottom-0 left-0 flex items-center transform="translate-x--10 translate-y--10">
  <div w-full flex items-center justify-end gap-4>
    <img src="/KubeCon.svg" h-20 translate-y-4>
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
