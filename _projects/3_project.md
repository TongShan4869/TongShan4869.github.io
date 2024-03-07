---
layout: page
title: Musical Consonance Coding in Midbrain Neurons
description: Representation of consonance/dissonance of music intervals/chords by the midbrain neurons - A modeling work.
img: assets/img/chord.png
importance: 3
category: Academic
---

Representation of consonance/dissonance of music intervals and chords by the midbrain neurons (i.e., inferior colliculus, IC). A modeling work.

The initial results was shown in [Carney et al. ARO 2019 poster](https://github.com/TongShan4869/Musical-Dissonance-Neural-Coding/blob/main/ARO_2019_Carney_pitch_Final.pdf)

We found the contrast of IC neurons can be used as a metric to characterize the consonance/dissonance of a musical interval or chord. The theory is based on the neural fluctuation mechanism of IC neurons (Carney, Li & McDonough, 2015).

**SFIE model of Inferior Colliculus (Nelson & Carney, 2007)** was used to derive the IC neuron activity. Metrics to characterize consonance includes:

1) standard deviation of mean neuron firing rate across characteristic frequencies (CF)
2) the standard deviation of neuron firing rate variation across CFs

We then correlate the metrics with the behavioral data.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/Consonance_correlation.png" title="correlation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The perceptual consonance score superimposed by the IC neural activity profile.
</div>

Pearson's r=0.78 between the IC neuron fluctuation profile and the behavioral results from Tufts et al. (2005).

This project is still in progress!!

Code can be found in [github](https://github.com/TongShan4869/Musical-Dissonance-Neural-Coding).
