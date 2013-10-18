# Post conversion

* Some `@import` orders have been switched to don't broke Stylus parsing
* Some .mixin have been rename to .mixin() for a better conversion


# After conversion: stylus parse try

Fixes of "parse error": I've change just some tiny stuffs. Mainly;
* url(data...) to url(unquote('data...'))
* same for microsoft filters

# Manual Output comparison

```shell
stylus --out _output index.styl

lessc index.less > _output/index.less.css
```

Since I've used @extend with `less2stylus()`, I can do a simple comparison. So I modified a little bit the less code to be able to try comparision without @extend (it was hard since less has same syntax for class & mixins).

# Comparison results

## Things that are not a problem

* By default, stylus does not include  /* */ comments so there some differences but really not important
* The opacity() mixin is completly broken but it's not really a problem. It's just less than 10 lines. & Stylus nib extension have that https://github.com/visionmedia/nib/blob/master/lib/nib/vendor.styl#L240
* Some url('') have been changed to url(""), it's not a problem.
* Some color value have been optimized (e.g. : black to #000) or lowercased

# Main issue

Becareful, there is a sort of major with if a less mixin, which are also class name.
So for some mixin called without args, you have to add the class name after the mixin declaration.

```styl
mixin() { // previously .mixin used as a mixin
    //...
}

.mixin {
    mixin()
}

```

## Only tiny issue

Same Color functions return differents results
e.g. :

* less lighten(#E0E3E4, 5%) => #eeeff0
* stylus lighten(#E0E3E4, 5%) => #e2e4e5
* sass lighten(#E0E3E4, 5%) => #eeeff0

The difference is no easily visible, but anyway, I've bumped this issue https://github.com/LearnBoost/stylus/issues/328
Compare the difference http://0to255.com/eeeff0 vs http://0to255.com/e2e4e5
