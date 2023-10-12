import { AppFile } from '@/components/common';
import { AppFileLoading } from '.';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name, windowSize, fileStore, handleSelectItem, emits } from './AppTrashCanIconView.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'VCard', typeof __VLS_localComponents, "VCard", "vCard", "v-card"> &
__VLS_WithComponent<'VToolbar', typeof __VLS_localComponents, "VToolbar", "vToolbar", "v-toolbar"> &
__VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "vRow", "v-row"> &
__VLS_WithComponent<'VCol', typeof __VLS_localComponents, "VCol", "vCol", "v-col"> &
__VLS_WithComponent<'VBreadcrumbs', typeof __VLS_localComponents, "VBreadcrumbs", "vBreadcrumbs", "v-breadcrumbs"> &
__VLS_WithComponent<'VIcon', typeof __VLS_localComponents, "VIcon", "vIcon", "v-icon"> &
__VLS_WithComponent<'VBtn', typeof __VLS_localComponents, "VBtn", "vBtn", "v-btn"> &
__VLS_WithComponent<'AppFileLoading', typeof __VLS_localComponents, "AppFileLoading", "AppFileLoading", "AppFileLoading"> &
__VLS_WithComponent<'VBtnToggle', typeof __VLS_localComponents, "VBtnToggle", "vBtnToggle", "v-btn-toggle"> &
__VLS_WithComponent<'AppFile', typeof __VLS_localComponents, "AppFile", "AppFile", "AppFile"> &
__VLS_WithComponent<'AppFileRightClickMenu', typeof __VLS_localComponents, "AppFileRightClickMenu", "AppFileRightClickMenu", "AppFileRightClickMenu">;
__VLS_components.VCard; __VLS_components.VCard; __VLS_components.vCard; __VLS_components.vCard; __VLS_components["v-card"]; __VLS_components["v-card"];
// @ts-ignore
[VCard, VCard,];
__VLS_components.VToolbar; __VLS_components.VToolbar; __VLS_components.vToolbar; __VLS_components.vToolbar; __VLS_components["v-toolbar"]; __VLS_components["v-toolbar"];
// @ts-ignore
[VToolbar, VToolbar,];
({} as __VLS_IntrinsicElements).template; ({} as __VLS_IntrinsicElements).template; ({} as __VLS_IntrinsicElements).template; ({} as __VLS_IntrinsicElements).template; ({} as __VLS_IntrinsicElements).template; ({} as __VLS_IntrinsicElements).template;
__VLS_components.VRow; __VLS_components.VRow; __VLS_components.VRow; __VLS_components.VRow; __VLS_components.VRow; __VLS_components.VRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components["v-row"]; __VLS_components["v-row"]; __VLS_components["v-row"]; __VLS_components["v-row"]; __VLS_components["v-row"]; __VLS_components["v-row"];
// @ts-ignore
[VRow, VRow, VRow, VRow, VRow, VRow,];
__VLS_components.VCol; __VLS_components.VCol; __VLS_components.VCol; __VLS_components.VCol; __VLS_components.VCol; __VLS_components.VCol; __VLS_components.vCol; __VLS_components.vCol; __VLS_components.vCol; __VLS_components.vCol; __VLS_components.vCol; __VLS_components.vCol; __VLS_components["v-col"]; __VLS_components["v-col"]; __VLS_components["v-col"]; __VLS_components["v-col"]; __VLS_components["v-col"]; __VLS_components["v-col"];
// @ts-ignore
[VCol, VCol, VCol, VCol, VCol, VCol,];
__VLS_components.VBreadcrumbs; __VLS_components.VBreadcrumbs; __VLS_components.vBreadcrumbs; __VLS_components.vBreadcrumbs; __VLS_components["v-breadcrumbs"]; __VLS_components["v-breadcrumbs"];
// @ts-ignore
[VBreadcrumbs, VBreadcrumbs,];
__VLS_components.VIcon; __VLS_components.VIcon; __VLS_components.VIcon; __VLS_components.VIcon; __VLS_components.vIcon; __VLS_components.vIcon; __VLS_components.vIcon; __VLS_components.vIcon; __VLS_components["v-icon"]; __VLS_components["v-icon"]; __VLS_components["v-icon"]; __VLS_components["v-icon"];
// @ts-ignore
[VIcon, VIcon, VIcon, VIcon,];
__VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components["v-btn"]; __VLS_components["v-btn"]; __VLS_components["v-btn"]; __VLS_components["v-btn"];
// @ts-ignore
[VBtn, VBtn, VBtn, VBtn,];
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div;
__VLS_components.AppFileLoading;
// @ts-ignore
[AppFileLoading,];
__VLS_components.VBtnToggle; __VLS_components.VBtnToggle; __VLS_components.vBtnToggle; __VLS_components.vBtnToggle; __VLS_components["v-btn-toggle"]; __VLS_components["v-btn-toggle"];
// @ts-ignore
[VBtnToggle, VBtnToggle,];
__VLS_components.AppFile;
// @ts-ignore
[AppFile,];
__VLS_components.AppFileRightClickMenu;
// @ts-ignore
[AppFileRightClickMenu,];
{
let __VLS_0!: 'VCard' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCard : 'vCard' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCard : 'v-card' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-card'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCard'];
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{}, class: ("w-100"), height: ((__VLS_ctx.windowSize.height.value - 130)), }));
({} as { VCard: typeof __VLS_0; }).VCard;
({} as { VCard: typeof __VLS_0; }).VCard;
const __VLS_2 = __VLS_1({ ...{}, class: ("w-100"), height: ((__VLS_ctx.windowSize.height.value - 130)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("w-100"), height: ((__VLS_ctx.windowSize.height.value - 130)), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
let __VLS_5!: 'VToolbar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VToolbar : 'vToolbar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vToolbar : 'v-toolbar' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-toolbar'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VToolbar'];
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ ...{}, border: (true), density: ("compact"), }));
({} as { VToolbar: typeof __VLS_5; }).VToolbar;
({} as { VToolbar: typeof __VLS_5; }).VToolbar;
const __VLS_7 = __VLS_6({ ...{}, border: (true), density: ("compact"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, border: (true), density: ("compact"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
{
const __VLS_10 = ({} as __VLS_IntrinsicElements)["template"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
({} as __VLS_IntrinsicElements).template;
({} as __VLS_IntrinsicElements).template;
const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_8.slots!).title;
{
let __VLS_13!: 'VRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VRow : 'vRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vRow : 'v-row' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-row'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VRow'];
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ ...{}, align: ("center"), }));
({} as { VRow: typeof __VLS_13; }).VRow;
({} as { VRow: typeof __VLS_13; }).VRow;
const __VLS_15 = __VLS_14({ ...{}, align: ("center"), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_13, typeof __VLS_15> & Record<string, unknown>) => void)({ ...{}, align: ("center"), });
const __VLS_16 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15)!;
let __VLS_17!: __VLS_NormalizeEmits<typeof __VLS_16.emit>;
{
let __VLS_18!: 'VCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCol : 'vCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCol : 'v-col' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-col'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCol'];
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{}, class: (""), }));
({} as { VCol: typeof __VLS_18; }).VCol;
({} as { VCol: typeof __VLS_18; }).VCol;
const __VLS_20 = __VLS_19({ ...{}, class: (""), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_18, typeof __VLS_20> & Record<string, unknown>) => void)({ ...{}, class: (""), });
const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20)!;
let __VLS_22!: __VLS_NormalizeEmits<typeof __VLS_21.emit>;
{
let __VLS_23!: 'VBreadcrumbs' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VBreadcrumbs : 'vBreadcrumbs' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vBreadcrumbs : 'v-breadcrumbs' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-breadcrumbs'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VBreadcrumbs'];
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({ ...{}, items: ((['', '垃圾篓'])), }));
({} as { VBreadcrumbs: typeof __VLS_23; }).VBreadcrumbs;
({} as { VBreadcrumbs: typeof __VLS_23; }).VBreadcrumbs;
const __VLS_25 = __VLS_24({ ...{}, items: ((['', '垃圾篓'])), }, ...__VLS_functionalComponentArgsRest(__VLS_24));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_23, typeof __VLS_25> & Record<string, unknown>) => void)({ ...{}, items: ((['', '垃圾篓'])), });
const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_23, __VLS_25)!;
let __VLS_27!: __VLS_NormalizeEmits<typeof __VLS_26.emit>;
{
const __VLS_28 = ({} as __VLS_IntrinsicElements)["template"];
const __VLS_29 = __VLS_elementAsFunctionalComponent(__VLS_28);
({} as __VLS_IntrinsicElements).template;
({} as __VLS_IntrinsicElements).template;
const __VLS_30 = __VLS_29({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_29));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_28, typeof __VLS_30> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_26.slots!).divider;
{
let __VLS_31!: 'VIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VIcon : 'vIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vIcon : 'v-icon' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-icon'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VIcon'];
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({ ...{}, icon: ("mdi-chevron-right"), }));
({} as { VIcon: typeof __VLS_31; }).VIcon;
({} as { VIcon: typeof __VLS_31; }).VIcon;
const __VLS_33 = __VLS_32({ ...{}, icon: ("mdi-chevron-right"), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{}, icon: ("mdi-chevron-right"), });
const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
}
}
}
{
const __VLS_36 = ({} as __VLS_IntrinsicElements)["template"];
const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
({} as __VLS_IntrinsicElements).template;
({} as __VLS_IntrinsicElements).template;
const __VLS_38 = __VLS_37({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_38> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_26.slots!).prepend;
{
let __VLS_39!: 'VIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VIcon : 'vIcon' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vIcon : 'v-icon' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-icon'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VIcon'];
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({ ...{}, size: ("small"), icon: (('mdi-' + 'folder-open')), }));
({} as { VIcon: typeof __VLS_39; }).VIcon;
({} as { VIcon: typeof __VLS_39; }).VIcon;
const __VLS_41 = __VLS_40({ ...{}, size: ("small"), icon: (('mdi-' + 'folder-open')), }, ...__VLS_functionalComponentArgsRest(__VLS_40));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_39, typeof __VLS_41> & Record<string, unknown>) => void)({ ...{}, size: ("small"), icon: (('mdi-' + 'folder-open')), });
const __VLS_42 = __VLS_pickFunctionalComponentCtx(__VLS_39, __VLS_41)!;
let __VLS_43!: __VLS_NormalizeEmits<typeof __VLS_42.emit>;
}
}
}
}
(__VLS_21.slots!).default;
}
{
let __VLS_44!: 'VCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCol : 'vCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCol : 'v-col' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-col'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCol'];
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ ...{}, cols: ("auto"), class: (""), }));
({} as { VCol: typeof __VLS_44; }).VCol;
({} as { VCol: typeof __VLS_44; }).VCol;
const __VLS_46 = __VLS_45({ ...{}, cols: ("auto"), class: (""), }, ...__VLS_functionalComponentArgsRest(__VLS_45));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_44, typeof __VLS_46> & Record<string, unknown>) => void)({ ...{}, cols: ("auto"), class: (""), });
const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46)!;
let __VLS_48!: __VLS_NormalizeEmits<typeof __VLS_47.emit>;
{
let __VLS_49!: 'VBtn' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VBtn : 'vBtn' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vBtn : 'v-btn' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-btn'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VBtn'];
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-empty"), size: ("large"), }));
({} as { VBtn: typeof __VLS_49; }).VBtn;
({} as { VBtn: typeof __VLS_49; }).VBtn;
const __VLS_51 = __VLS_50({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-empty"), size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_50));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_49, typeof __VLS_51> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-empty"), size: ("large"), });
const __VLS_52 = __VLS_pickFunctionalComponentCtx(__VLS_49, __VLS_51)!;
let __VLS_53!: __VLS_NormalizeEmits<typeof __VLS_52.emit>;
let __VLS_54 = { 'click': __VLS_pickEvent(__VLS_53['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_50, typeof __VLS_51>).onClick) };
__VLS_54 = {
click: $event => {
__VLS_ctx.fileStore.
                                        ;
}
};
(__VLS_52.slots!).default;
}
{
let __VLS_55!: 'VBtn' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VBtn : 'vBtn' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vBtn : 'v-btn' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-btn'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VBtn'];
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-restore"), size: ("large"), }));
({} as { VBtn: typeof __VLS_55; }).VBtn;
({} as { VBtn: typeof __VLS_55; }).VBtn;
const __VLS_57 = __VLS_56({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-restore"), size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_56));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_55, typeof __VLS_57> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, prependIcon: ("mdi-delete-restore"), size: ("large"), });
const __VLS_58 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57)!;
let __VLS_59!: __VLS_NormalizeEmits<typeof __VLS_58.emit>;
let __VLS_60 = { 'click': __VLS_pickEvent(__VLS_59['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_56, typeof __VLS_57>).onClick) };
__VLS_60 = {
click: $event => {
__VLS_ctx.fileStore.fetch();
}
};
(__VLS_58.slots!).default;
}
(__VLS_47.slots!).default;
}
(__VLS_16.slots!).default;
}
}
}
}
{
const __VLS_61 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_63 = __VLS_62({ ...{}, style: (({ height: `${__VLS_ctx.windowSize.height.value - 240}px` })), }, ...__VLS_functionalComponentArgsRest(__VLS_62));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{}, style: (({ height: `${__VLS_ctx.windowSize.height.value - 240}px` })), });
const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
if (__VLS_ctx.fileStore.loading) {
{
let __VLS_66!: 'AppFileLoading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.AppFileLoading : (typeof __VLS_resolvedLocalAndGlobalComponents)['AppFileLoading'];
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ ...{}, class: ("mt-16 w-100"), }));
({} as { AppFileLoading: typeof __VLS_66; }).AppFileLoading;
const __VLS_68 = __VLS_67({ ...{}, class: ("mt-16 w-100"), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_66, typeof __VLS_68> & Record<string, unknown>) => void)({ ...{}, class: ("mt-16 w-100"), });
const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68)!;
let __VLS_70!: __VLS_NormalizeEmits<typeof __VLS_69.emit>;
}
// @ts-ignore
[windowSize, windowSize, windowSize, fileStore, fileStore, windowSize, windowSize, fileStore,];
}
else if (__VLS_ctx.fileStore.renderList.length) {
{
let __VLS_71!: 'VBtnToggle' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VBtnToggle : 'vBtnToggle' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vBtnToggle : 'v-btn-toggle' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-btn-toggle'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VBtnToggle'];
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
...{}, density: ((null)), class: ("pa-5 w-100"), modelValue: ((
__VLS_ctx.fileStore.selectedList.map((it_name) => __VLS_ctx.fileStore.renderList.findIndex((it) => it.name === it_name)
)
)),
}));
({} as { VBtnToggle: typeof __VLS_71; }).VBtnToggle;
({} as { VBtnToggle: typeof __VLS_71; }).VBtnToggle;
const __VLS_73 = __VLS_72({
...{}, density: ((null)), class: ("pa-5 w-100"), modelValue: ((
__VLS_ctx.fileStore.selectedList.map((it_name) => __VLS_ctx.fileStore.renderList.findIndex((it) => it.name === it_name)
)
)),
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_71, typeof __VLS_73> & Record<string, unknown>) => void)({
...{}, density: ((null)), class: ("pa-5 w-100"), modelValue: ((
__VLS_ctx.fileStore.selectedList.map((it_name) => __VLS_ctx.fileStore.renderList.findIndex((it) => it.name === it_name)
)
)),
});
const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_71, __VLS_73)!;
let __VLS_75!: __VLS_NormalizeEmits<typeof __VLS_74.emit>;
__VLS_directiveFunction(__VLS_ctx.vShow)((!__VLS_ctx.fileStore.show));
if (__VLS_ctx.width) {
{
let __VLS_76!: 'VRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VRow : 'vRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vRow : 'v-row' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-row'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VRow'];
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({ ...{}, style: (({ 'padding-left': `${(__VLS_ctx.width % 158) / 2 + 15}px` })), }));
({} as { VRow: typeof __VLS_76; }).VRow;
({} as { VRow: typeof __VLS_76; }).VRow;
const __VLS_78 = __VLS_77({ ...{}, style: (({ 'padding-left': `${(__VLS_ctx.width % 158) / 2 + 15}px` })), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_76, typeof __VLS_78> & Record<string, unknown>) => void)({ ...{}, style: (({ 'padding-left': `${(__VLS_ctx.width % 158) / 2 + 15}px` })), });
const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78)!;
let __VLS_80!: __VLS_NormalizeEmits<typeof __VLS_79.emit>;
for (const [iterator, index] of __VLS_getVForSourceType((__VLS_ctx.fileStore.renderList)!)) {
{
let __VLS_81!: 'VCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VCol : 'vCol' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vCol : 'v-col' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-col'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VCol'];
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({ ...{}, key: ((index)), class: ("px-1"), cols: ("auto"), }));
({} as { VCol: typeof __VLS_81; }).VCol;
({} as { VCol: typeof __VLS_81; }).VCol;
const __VLS_83 = __VLS_82({ ...{}, key: ((index)), class: ("px-1"), cols: ("auto"), }, ...__VLS_functionalComponentArgsRest(__VLS_82));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_81, typeof __VLS_83> & Record<string, unknown>) => void)({ ...{}, key: ((index)), class: ("px-1"), cols: ("auto"), });
const __VLS_84 = __VLS_pickFunctionalComponentCtx(__VLS_81, __VLS_83)!;
let __VLS_85!: __VLS_NormalizeEmits<typeof __VLS_84.emit>;
{
let __VLS_86!: 'AppFile' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.AppFile : (typeof __VLS_resolvedLocalAndGlobalComponents)['AppFile'];
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({ ...{ onClick: {} as any, onDblclick: {} as any, onContextmenu: {} as any, }, fileItem: ((iterator)), elevation: ("0"), style: ({}), }));
({} as { AppFile: typeof __VLS_86; }).AppFile;
const __VLS_88 = __VLS_87({ ...{ onClick: {} as any, onDblclick: {} as any, onContextmenu: {} as any, }, fileItem: ((iterator)), elevation: ("0"), style: ({}), }, ...__VLS_functionalComponentArgsRest(__VLS_87));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_86, typeof __VLS_88> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, onDblclick: {} as any, onContextmenu: {} as any, }, fileItem: ((iterator)), elevation: ("0"), style: ({}), });
const __VLS_89 = __VLS_pickFunctionalComponentCtx(__VLS_86, __VLS_88)!;
let __VLS_90!: __VLS_NormalizeEmits<typeof __VLS_89.emit>;
__VLS_directiveFunction(__VLS_ctx.vClickOutside)(({
handler: () => (__VLS_ctx.fileStore.selectedList.length = 0),
closeConditional: () => __VLS_ctx.fileStore.selectedList.includes(iterator.name)
}));
let __VLS_91 = { 'click': __VLS_pickEvent(__VLS_90['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_87, typeof __VLS_88>).onClick) };
__VLS_91 = {
click: $event => {
if (!(!((__VLS_ctx.fileStore.loading)))) return;
if (!((__VLS_ctx.fileStore.renderList.length))) return;
if (!((__VLS_ctx.width))) return;
__VLS_ctx.handleSelectItem(index);
}
};
let __VLS_92 = { 'dblclick': __VLS_pickEvent(__VLS_90['dblclick'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_87, typeof __VLS_88>).onDblclick) };
__VLS_92 = {
dblclick: $event => {
if (!(!((__VLS_ctx.fileStore.loading)))) return;
if (!((__VLS_ctx.fileStore.renderList.length))) return;
if (!((__VLS_ctx.width))) return;
__VLS_ctx.emits('doubleClick', iterator);
}
};
let __VLS_93 = { 'contextmenu': __VLS_pickEvent(__VLS_90['contextmenu'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_87, typeof __VLS_88>).onContextmenu) };
__VLS_93 = {
contextmenu: $event => {
if (!(!((__VLS_ctx.fileStore.loading)))) return;
if (!((__VLS_ctx.fileStore.renderList.length))) return;
if (!((__VLS_ctx.width))) return;
__VLS_ctx.emits('rightClick', $event, iterator);
}
};
}
(__VLS_84.slots!).default;
}
// @ts-ignore
[fileStore, fileStore, fileStore, fileStore, fileStore, fileStore, fileStore, fileStore, width, width, width, width, fileStore, fileStore, fileStore, handleSelectItem, emits, emits,];
}
(__VLS_79.slots!).default;
}
}
(__VLS_74.slots!).default;
}
}
else {
{
let __VLS_94!: 'VRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VRow : 'vRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vRow : 'v-row' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-row'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VRow'];
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({ ...{}, justify: ("center"), align: ("center"), class: ("fill-height ma-0 pa-0"), }));
({} as { VRow: typeof __VLS_94; }).VRow;
({} as { VRow: typeof __VLS_94; }).VRow;
const __VLS_96 = __VLS_95({ ...{}, justify: ("center"), align: ("center"), class: ("fill-height ma-0 pa-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_95));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_94, typeof __VLS_96> & Record<string, unknown>) => void)({ ...{}, justify: ("center"), align: ("center"), class: ("fill-height ma-0 pa-0"), });
const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_94, __VLS_96)!;
let __VLS_98!: __VLS_NormalizeEmits<typeof __VLS_97.emit>;
(__VLS_97.slots!).default;
}
}
(__VLS_64.slots!).default;
}
(__VLS_3.slots!).default;
}
{
let __VLS_99!: 'AppFileRightClickMenu' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.AppFileRightClickMenu : (typeof __VLS_resolvedLocalAndGlobalComponents)['AppFileRightClickMenu'];
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({ ...{}, }));
({} as { AppFileRightClickMenu: typeof __VLS_99; }).AppFileRightClickMenu;
const __VLS_101 = __VLS_100({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_100));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_99, typeof __VLS_101> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_102 = __VLS_pickFunctionalComponentCtx(__VLS_99, __VLS_101)!;
let __VLS_103!: __VLS_NormalizeEmits<typeof __VLS_102.emit>;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["w-100"];
__VLS_styleScopedClasses["mt-16"];
__VLS_styleScopedClasses["w-100"];
__VLS_styleScopedClasses["pa-5"];
__VLS_styleScopedClasses["w-100"];
__VLS_styleScopedClasses["px-1"];
__VLS_styleScopedClasses["fill-height"];
__VLS_styleScopedClasses["ma-0"];
__VLS_styleScopedClasses["pa-0"];
}
var __VLS_slots!: {};
return __VLS_slots;
}
