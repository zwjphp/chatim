<template>
	<view class="m-input-view">
		<input :focus="focus" :type="inputType" :value="value" @input="onImput" class="m-input-input" :placeholder="placeholder"
		:password="type==='password'&&!showPassword" @focus="onFocus" @blur="onBlur" />
		<view v-if="clearable&&!displayable&&value.length" class="m-input-icon">
			<m-icon color="#666666" type="clear" @click="clear"></m-icon>
		</view>
		<view v-if="displayable" class="m-input-icon">
			<m-icon :style="{color:showPassword?'#666666':'#cccccc'}" type="eye" @click="display"></m-icon>
		</view>
	</view>
</template>

<script>
	import mIcon from './m-icon/m-icon.vue';
	export default {
		components: {
			mIcon
		},
		props: {
			type: String,
			value: String,
			placeholder: String,
			clearable: {
				type: [Boolean, String],
				default: false
			},
			displayable: {
				type: [Boolean, String],
				default: false 
			},
			focus: {
				type: [Boolean, String],
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {
				showPassword: false,
				isFocus: false
			}
		},
		computed: {
			inputType() {
				const type = this.type
				return type === 'password' ? 'text' : type
			}
		},
		methods: {
			clear() {
				this.$emit('input', '')
			},
			display() {
				this.showPassword = !this.showPassword
			},
			onFocus() {
				this.isFocus = true
			},
			onBlur() {
				this.$nextTick(() => {
					this.isFocus = false
				})
			},
			onImput(e) {
				this.$emit('input', e.detail.value)
			}
		}
	}
</script>

<style>
	.m-input-view {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		padding: 0 10px;
	}
	.m-input-input {
		flex: 1;
		width: 100%;
		min-height: 100%;
		line-height: inherit;
		background-color: rgba(0, 0, 0, 0);
	}
	
	.m-input-icon {
		width: 20px;
		font-size: 20px;
		line-height: 20px;
		color: #666666;
	}
</style>
