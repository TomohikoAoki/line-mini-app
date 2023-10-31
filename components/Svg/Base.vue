<template>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :viewBox="viewBox"
        :aria-labelledby="iconName" role="img" y="0px" x="0px" :preserveAspectRatio="preserveAspectRatio">
        <title :id="iconName" lang="ja">{{ iconName }} </title>
        <g :fill="iconColor">
            <slot></slot>
        </g>
    </svg>
</template>
  
<script>

export default {
    name: "SVGElement",
    props: {
        iconName: {
            type: String,
            default: 'box'
        },
        viewBox: {
            type: [String],
            default: "0 0 132 40"
        },
        iconTitle: {
            type: String,
            default: 'title'
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        },
        preserveAspectRatio: {
            type: String,
            default: "xMidYMid meet"
        }
    },
}
</script>
  