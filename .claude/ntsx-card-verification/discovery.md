# Top-level Canvas Discovery Packet

Source: live top-level describe_control on 2026-10-31, environment 78421d47-0cef-e8c4-951b-880c180a599d, app 67b4c058-14cc-45ff-9c25-5c8adc911cca. No new APIs, data sources or Canvas/Code Components are introduced or modified. Frozen components outside con_ListNhapTuSanXuat are not part of this plan; do not recreate them.

## Control GroupContainer
Part of the control family Classic.

Control creation keywords:
```yaml
Control: GroupContainer
Variant: <variant name> # required
```
Containment: YAML children supported: True; Canvas Component descendants supported: True.
Variants: AutoLayout, GridLayout, ManualLayout. Author AutoLayout only.

Input Properties (exact names and enum names):
- BorderColor: Color; Default RGBA(0, 0, 0, 1)
- BorderStyle: Enum; Default BorderStyle.Solid; Enum name: BorderStyle; values Dashed, Dotted, None, Solid
- BorderThickness: Number; Default 0
- ContentLanguage: Text
- DropShadow: Enum; Default DropShadow.Light; Enum name: DropShadow; values Bold, ExtraBold, Light, None, Regular, Semibold, Semilight
- EnableChildFocus: Boolean; Default true
- Fill: Color; Default RGBA(0, 0, 0, 0)
- Height: Number; Default 200
- RadiusBottomLeft, RadiusBottomRight, RadiusTopLeft, RadiusTopRight: Number; Default 4
- Visible: Boolean; Default true
- Width: Number; Default 500
- X, Y: Number; Default 0

Additional input properties for variant AutoLayout:
- LayoutAlignItems: Enum; Enum name: LayoutAlignItems; values Center, End, Start, Stretch; Default LayoutAlignItems.Start
- LayoutDirection: Enum; required; Enum name: LayoutDirection; values Horizontal, Vertical
- LayoutGap: Number; Default 0
- LayoutJustifyContent: Enum; Enum name: LayoutJustifyContent; values Center, End, SpaceBetween, Start
- LayoutOverflowX, LayoutOverflowY: Enum; Enum name: LayoutOverflow; values Hide, Scroll; Default LayoutOverflow.Hide
- LayoutWrap: Boolean; Default false
- PaddingBottom, PaddingLeft, PaddingRight, PaddingTop: Number; Default 0

Additional input properties if a child of a Vertical or Horizontal GroupContainer:
- AlignInContainer: Enum; Enum name: AlignInContainer; values Center, End, SetByContainer, Start, Stretch; Default AlignInContainer.Stretch
- FillPortions: Number; Default 1
- LayoutMaxHeight, LayoutMaxWidth: Number; Default 0
- LayoutMinHeight: Number; Default 100
- LayoutMinWidth: Number; Default 250

Approved enum literals: =BorderStyle.Solid, =BorderStyle.None, =DropShadow.None, =DropShadow.Light, =LayoutAlignItems.Start, =LayoutAlignItems.Center, =LayoutAlignItems.Stretch, =LayoutDirection.Horizontal, =LayoutDirection.Vertical, =LayoutJustifyContent.Start, =LayoutOverflow.Hide, =AlignInContainer.Start, =AlignInContainer.Stretch.

## Control Gallery
Part of the control family Classic.

Control creation keywords:
```yaml
Control: Gallery
Variant: <variant name> # required
```
Containment: declared supports=True, replicates=True; YAML children supported: True; Canvas Component descendants supported: False. Some unresolved internal templates are unsupported; GroupContainer template composition still requires compile.
Variants: Horizontal, VariableHeight, Vertical. Author VariableHeight, NOT WrapCount.

Input properties:
- BorderStyle: Enum; Enum name: BorderStyle; values Dashed, Dotted, None, Solid
- ContentLanguage: Text
- Default: Record
- DisplayMode: Enum; Enum name: DisplayMode; values Disabled, Edit, View
- Fill: Color
- FocusedBorderColor: Color
- FocusedBorderThickness: Number
- LoadingSpinnerColor: Color
- NavigationStep: Number
- Selectable: Boolean
- ShowNavigation: Boolean
- TabIndex: Number; Default -1
- Transition: Enum; Enum name: Transition; values None, Pop, Push
- Visible: Boolean

Additional input properties for variant VariableHeight:
- AccessibleLabel: Text
- BorderColor: Color
- BorderThickness: Number
- DelayItemLoading: Boolean
- Height: Number; Default 575
- Items: Table
- LoadingSpinner: Enum; Enum name: LoadingSpinner; values Controls, Data, None
- MaxTemplateSize: Number; Default 5000
- ShowScrollbar: Boolean
- TemplatePadding: Number; Default 5
- TemplateSize: Number; Default 280
- Width: Number; Default 640
- X, Y: Number

WrapCount appears ONLY on Horizontal/Vertical, not VariableHeight. Do not author it here.

Additional input properties if a child of a Vertical or Horizontal GroupContainer:
- AlignInContainer: Enum; Enum name: AlignInContainer; values Center, End, SetByContainer, Start, Stretch
- FillPortions: Number; Default 1
- LayoutMaxHeight, LayoutMaxWidth: Number; Default 0
- LayoutMinHeight: Number; Default 287
- LayoutMinWidth: Number; Default 320

Output properties include AllItems, AllItemsCount, Selected, TemplateHeight, TemplateWidth, VisibleIndex. Use Parent.TemplateWidth only on direct card child. No new events or selection logic.
Approved enum literals: =BorderStyle.None, =AlignInContainer.Stretch.

## Control ModernText
Part of the control family React.

Control creation keywords:
```yaml
Control: ModernText
```
Containment: YAML children supported: False.

Input Properties:
- AccessibleLabel: Text
- Align: Enum; Enum name: Align; values Center, Justify, Left, Right
- AutoHeight: Boolean; Default false
- BorderColor: Color
- BorderStyle: Enum; Enum name: BorderStyle; values Dashed, Dotted, None, Solid
- BorderThickness: Number
- Color: Color
- ContentLanguage: Text
- DisplayMode: Enum; Enum name: DisplayMode; values Disabled, Edit, View
- Fill: Color
- Font: Enum; Enum name: Font; values include Segoe UI; existing fxFontFamily = Font.'Segoe UI'
- FontWeight: Enum; Enum name: FontWeight; values Bold, Lighter, Normal, Semibold
- Height: Number; Default 32
- Italic: Boolean
- OnSelect: Boolean; Default false (DO NOT ADD)
- PaddingBottom, PaddingLeft, PaddingRight, PaddingTop: Number; Default 5
- RadiusBottomLeft, RadiusBottomRight, RadiusTopLeft, RadiusTopRight: Number
- Size: Number; Default 15
- Strikethrough: Boolean
- Text: Text
- Underline: Boolean
- VerticalAlign: Enum; Enum name: VerticalAlign; values Bottom, Middle, Top
- Visible: Boolean; Default true
- Width: Number; Default 150
- Wrap: Boolean; Default true
- X, Y: Number

Additional input properties if a child of a Vertical or Horizontal GroupContainer:
- AlignInContainer: Enum; Enum name: AlignInContainer; values Center, End, SetByContainer, Start, Stretch
- FillPortions: Number; Default 0
- LayoutMaxHeight, LayoutMaxWidth: Number; Default 0
- LayoutMinHeight: Number; Default 32
- LayoutMinWidth: Number; Default 150

Approved enum literals: =Align.Left, =VerticalAlign.Top, =AlignInContainer.Stretch. Shared font/weights remain named formulas.

## Control ModernButton
Part of the control family React.

Control creation keywords:
```yaml
Control: ModernButton
```
Containment: YAML children supported: False.

Input Properties:
- AccessibleLabel: Text
- Align: Enum; Enum name: Align; values Center, Justify, Left, Right
- Appearance: Enum; Enum name: ButtonAppearance; values Outline, Primary, Secondary, Subtle, Transparent; Default ButtonAppearance.Primary
- BasePaletteColor: Color
- BorderColor: Color
- BorderStyle: Enum; Enum name: BorderStyle; values Dashed, Dotted, None, Solid
- BorderThickness: Number
- Color: Color
- ContentLanguage: Text
- DisplayMode: Enum; Enum name: DisplayMode; values Disabled, Edit, View
- Font: Enum; Enum name: Font; values include Segoe UI; reuse fxFontFamily
- FontWeight: Enum; Enum name: FontWeight; values Bold, Lighter, Normal, Semibold
- Height: Number; Default 32
- Icon: Text
- IconRotation: Number
- IconStyle: Enum; Enum name: IconStyle; values Filled, Outline
- Italic: Boolean
- Layout: Enum; Enum name: ButtonLayout; values IconAfter, IconBefore, IconOnly, TextOnly; Default ButtonLayout.IconBefore
- OnSelect: Boolean (preserve verbatim)
- PaddingBottom, PaddingLeft, PaddingRight, PaddingTop: Number
- RadiusBottomLeft, RadiusBottomRight, RadiusTopLeft, RadiusTopRight: Number
- Size: Number
- Strikethrough: Boolean
- Text: Text
- Tooltip: Text
- Underline: Boolean
- VerticalAlign: Enum; Enum name: VerticalAlign; values Bottom, Middle, Top
- Visible: Boolean (preserve Delete formulas)
- Width: Number; Default 96
- X, Y: Number

Additional input properties if a child of a Vertical or Horizontal GroupContainer:
- AlignInContainer: Enum; Enum name: AlignInContainer; values Center, End, SetByContainer, Start, Stretch
- FillPortions: Number; Default 0
- LayoutMaxHeight, LayoutMaxWidth: Number; Default 0
- LayoutMinHeight: Number; Default 32
- LayoutMinWidth: Number; Default 96

No Fill property. Green palette + Primary + white Color for View. Outline + gray BorderColor + white parent Fill for Delete; real rendering unverified.
Approved enum literals: =ButtonAppearance.Primary, =ButtonAppearance.Outline, =ButtonLayout.IconBefore, =BorderStyle.Solid, =Align.Center.

## Existing App Context (frozen)
- fxFontFamily=Font.'Segoe UI'; sizes MD=14, LG=16, SM=12; weights normal/semibold/bold named formulas.
- fxTextPrimary=RGBA(31,41,55,1), fxTextSecondary=RGBA(107,114,128,1), fxTextWhite=RGBA(255,255,255,1).
- Existing brand green RGBA(45,128,40,1).
- All business named formulas, data, events and variables frozen.
- Native record identity ThisItem.ID, human-readable ReceiptCode. Details relationship ReceiptID=ThisItem.ID.
- No external references to the target controls found by completed app-wide exploration. No Select(Parent), IsSelected or hidden row-selection behavior in the View.
- Original screen has root-level overlays; preserve rather than reparent out-of-scope UI.
- Exact baseline copy and hashes live at D:/Developer/PowerApp/QLKho/.claude/ntsx-card-verification/baseline and baseline.json.
- The existing date phone prefix, raw shift, VI-only category, language-dependent status, number format and count AllItems are intentional invariants, not fixes.
