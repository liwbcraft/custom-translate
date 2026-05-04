const { Plugin, Notice, MarkdownView, PluginSettingTab, Setting, Menu, requestUrl } = require('obsidian');

// ==================== 国际化配置 ====================
const LOCALES = {
    'zh': {
        // 通用
        'translate': '翻译',
        'lookup': '查询单词',
        'add': '添加到单词本',
        'edit': '编辑',
        'delete': '删除',
        'save': '保存',
        'cancel': '取消',
        'close': '关闭',
        'settings': '设置',
        // 单词卡片
        'definition': '释义',
        'examples': '例句',
        'synonyms': '同义词',
        'antonyms': '反义词',
        'phonetic_uk': '英式音标',
        'phonetic_us': '美式音标',
        'pos': '词性',
        'cefr': 'CEFR等级',
        'freq': '词频',
        'tags': '标签',
        'examples_format': '例句（格式: 英文|||中文）',
        'synonyms_format': '同义词（逗号分隔）',
        'antonyms_format': '反义词（逗号分隔）',
        // CEFR 等级中文描述
        'cefr_a1': '基础生活词',
        'cefr_a2': '日常表达扩展词',
        'cefr_b1': '抽象/学术/稍复杂词',
        // 提示信息
        'word_not_found': '未找到单词',
        'word_not_in_vocab': '不在单词本中',
        'add_to_vocab': '添加到单词本',
        'added': '已添加',
        'updated': '已更新',
        'deleted': '已删除',
        'please_select_word': '请先选中一个单词',
        'please_fill_word_def': '请填写单词和释义',
        'no_examples': '暂无例句',
        'no_words': '暂无单词，点击「添加单词」开始',
        'confirm_delete': '确定删除',
        'import_complete': '导入完成',
        'import_failed': '导入失败：文件格式错误',
        'exported': '单词本已导出',
        // 翻译相关
        'target_language': '目标语言',
        'translating': '正在翻译',
        'translation_complete': '翻译完成',
        'translation_empty': '翻译结果为空',
        'translation_failed': '翻译失败',
        'copied': '已复制',
        'connection_success': '连接成功',
        'connection_failed': '连接失败',
        'testing': '正在测试...',
        // 设置页面
        'settings_title': '自定义翻译设置',
        'api_settings': 'API 设置',
        'api_url': 'API 地址',
        'api_desc': '本地翻译代理服务的地址',
        'source_lang': '源语言',
        'source_desc': 'auto 为自动检测',
        'translation_settings': '翻译设置',
        'display_mode': '显示方式',
        'display_desc': '选择翻译后的显示方式',
        'display_below': '在下方插入译文',
        'display_replace': '替换原文',
        'language_presets': '语言预设',
        'vocab_management': '单词本管理',
        'open_vocab': '打开单词本',
        'open_vocab_desc': '管理你的单词本',
        'items_per_page': '每页显示数量',
        'items_per_page_desc': '单词本列表中每页显示的单词数',
        'connection_test': '测试连接',
        'test_connection': '测试连接',
        'test_desc': '测试本地代理服务是否可用',
        'hotkey_tips': '快捷键提示',
        'tip_hotkey': '在设置中自定义快捷键快速查询',
        'tip_translate': '选中文字后可使用快捷键翻译',
        'tip_double_click': '双击单词可选中文字',
        'tip_edit': '点击「编辑」按钮可修改单词信息',
        // 部署相关
        'deploy_title': '翻译服务部署',
        'deploy_desc': '本插件依赖 LibreTranslate 翻译服务，请确保已部署并运行',
        'docker_cmd': 'Docker 一键部署',
        'docker_code': 'docker run -d --name libretranslate -p 5000:5000 -m 1.5g --memory-swap 1.5g libretranslate/libretranslate:v1.9.5 --load-only en,zh',
        'after_deploy': '部署成功后，在下方设置 API 地址为：http://127.0.0.1:5000/translate',
        'view_docs': '查看官方文档',
        // 单词本
        'search_placeholder': '搜索单词...',
        'total_words': '共',
        'words': '个单词',
        'prev': '上一页',
        'next': '下一页',
        'word': '单词',
        'frequency': '词频',
        'export': '导出',
        'import': '导入',
        // 界面语言
        'interface_language': '界面语言',
        'interface_language_desc': '选择插件界面的显示语言',
        'chinese': '中文',
        'english': 'English',
        // 标签（中文）
        'tag_noun': '名词',
        'tag_verb': '动词',
        'tag_adj': '形容词',
        'tag_adv': '副词',
        'tag_prep': '介词',
        'tag_conj': '连词',
        'tag_pron': '代词',
        'tag_det': '限定词',
        'tag_aux': '助动词',
        'tag_art': '冠词',
        'tag_int': '感叹词',
        'tag_part': '小品词',
        'tag_abbrev': '缩写',
        'tag_core': '核心词',
        'tag_idiom': '习语',
        'tag_phrase': '短语',
        'tag_slang': '俚语',
        'tag_formal': '正式',
        'tag_informal': '非正式',
        'tag_old_fashioned': '陈旧用法',
        'tag_rare': '罕用',
        'tag_literary': '文学用语',
        'tag_technical': '专业术语',
        'tag_a1': '基础生活词',
        'tag_a2': '日常表达词',
        'tag_b1': '抽象/学术/稍复杂词',
        'tag_function': '功能词',
        'tag_greeting': '问候',
        'tag_food': '饮食',
        'tag_family': '家庭',
        'tag_time': '时间',
        'tag_place': '地点',
        'tag_emotion': '情感',
        'tag_action': '动作',
        'tag_travel': '旅行',
        'tag_work': '工作',
        'tag_study': '学习',
        'tag_body': '身体',
        'tag_nature': '自然',
        'tag_color': '颜色',
        'tag_number': '数字',
        'tag_irregular': '不规则',
        'tag_phrasal': '短语动词'
    },
    'en': {
        // Common
        'translate': 'Translate',
        'lookup': 'Look up',
        'add': 'Add to vocabulary',
        'edit': 'Edit',
        'delete': 'Delete',
        'save': 'Save',
        'cancel': 'Cancel',
        'close': 'Close',
        'settings': 'Settings',
        // Word card
        'definition': 'Definition',
        'examples': 'Examples',
        'synonyms': 'Synonyms',
        'antonyms': 'Antonyms',
        'phonetic_uk': 'UK Phonetic',
        'phonetic_us': 'US Phonetic',
        'pos': 'Part of speech',
        'cefr': 'CEFR level',
        'freq': 'Frequency',
        'tags': 'Tags',
        'examples_format': 'Examples (format: english|||chinese)',
        'synonyms_format': 'Synonyms (comma separated)',
        'antonyms_format': 'Antonyms (comma separated)',
        // CEFR English descriptions
        'cefr_a1': 'Basic daily words',
        'cefr_a2': 'Everyday expressions',
        'cefr_b1': 'Abstract/Academic/Slightly complex words',
        // Notices
        'word_not_found': 'Word not found',
        'word_not_in_vocab': 'is not in your vocabulary',
        'add_to_vocab': 'Add to vocabulary',
        'added': 'Added',
        'updated': 'Updated',
        'deleted': 'Deleted',
        'please_select_word': 'Please select a word first',
        'please_fill_word_def': 'Please provide both word and definition',
        'no_examples': 'No examples available',
        'no_words': 'No words yet. Click "Add" to get started.',
        'confirm_delete': 'Delete',
        'import_complete': 'Import complete',
        'import_failed': 'Import failed: invalid file format',
        'exported': 'Vocabulary exported',
        // Translation
        'target_language': 'Target language',
        'translating': 'Translating',
        'translation_complete': 'Translation complete',
        'translation_empty': 'Translation result is empty',
        'translation_failed': 'Translation failed',
        'copied': 'Copied',
        'connection_success': 'Connection successful',
        'connection_failed': 'Connection failed',
        'testing': 'Testing...',
        // Settings
        'settings_title': 'Custom Translate Settings',
        'api_settings': 'API Settings',
        'api_url': 'API URL',
        'api_desc': 'Local translation service endpoint',
        'source_lang': 'Source language',
        'source_desc': '"auto" for automatic detection',
        'translation_settings': 'Translation Settings',
        'display_mode': 'Display mode',
        'display_desc': 'How to display the translation',
        'display_below': 'Insert below original text',
        'display_replace': 'Replace original text',
        'language_presets': 'Language Presets',
        'vocab_management': 'Vocabulary Management',
        'open_vocab': 'Open vocabulary',
        'open_vocab_desc': 'Manage your word collection',
        'items_per_page': 'Items per page',
        'items_per_page_desc': 'Number of words per page in vocabulary list',
        'connection_test': 'Connection Test',
        'test_connection': 'Test connection',
        'test_desc': 'Check if the local translation service is available',
        'hotkey_tips': 'Hotkey Tips',
        'tip_hotkey': 'Set custom hotkeys in Obsidian Settings → Hotkeys',
        'tip_translate': 'Select text and use hotkey to translate',
        'tip_double_click': 'Double-click to select text',
        'tip_edit': 'Click "Edit" to modify word info',
        // Deploy
        'deploy_title': 'Deploy Translation Service',
        'deploy_desc': 'This plugin depends on LibreTranslate translation service. Please ensure it is deployed and running.',
        'docker_cmd': 'Docker one-click deploy',
        'docker_code': 'docker run -d --name libretranslate -p 5000:5000 -m 1.5g --memory-swap 1.5g libretranslate/libretranslate:v1.9.5 --load-only en,zh',
        'after_deploy': 'After deployment, set API URL to: http://127.0.0.1:5000/translate',
        'view_docs': 'View Docs',
        // Vocabulary
        'search_placeholder': 'Search words...',
        'total_words': 'Total',
        'words': 'words',
        'prev': 'Prev',
        'next': 'Next',
        'word': 'Word',
        'frequency': 'Frequency',
        'export': 'Export',
        'import': 'Import',
        // Interface language
        'interface_language': 'Interface Language',
        'interface_language_desc': 'Select the display language for the plugin interface',
        'chinese': '中文',
        'english': 'English',
        // Tags (English)
        'tag_noun': 'Noun',
        'tag_verb': 'Verb',
        'tag_adj': 'Adjective',
        'tag_adv': 'Adverb',
        'tag_prep': 'Preposition',
        'tag_conj': 'Conjunction',
        'tag_pron': 'Pronoun',
        'tag_det': 'Determiner',
        'tag_aux': 'Auxiliary',
        'tag_art': 'Article',
        'tag_int': 'Interjection',
        'tag_part': 'Particle',
        'tag_abbrev': 'Abbreviation',
        'tag_core': 'Core',
        'tag_idiom': 'Idiom',
        'tag_phrase': 'Phrase',
        'tag_slang': 'Slang',
        'tag_formal': 'Formal',
        'tag_informal': 'Informal',
        'tag_old_fashioned': 'Old-fashioned',
        'tag_rare': 'Rare',
        'tag_literary': 'Literary',
        'tag_technical': 'Technical',
        'tag_a1': 'A1 Basic',
        'tag_a2': 'A2 Daily',
        'tag_b1': 'B1 Abstract',
        'tag_function': 'Function',
        'tag_greeting': 'Greeting',
        'tag_food': 'Food',
        'tag_family': 'Family',
        'tag_time': 'Time',
        'tag_place': 'Place',
        'tag_emotion': 'Emotion',
        'tag_action': 'Action',
        'tag_travel': 'Travel',
        'tag_work': 'Work',
        'tag_study': 'Study',
        'tag_body': 'Body',
        'tag_nature': 'Nature',
        'tag_color': 'Color',
        'tag_number': 'Number',
        'tag_irregular': 'Irregular',
        'tag_phrasal': 'Phrasal'
    }
};

let currentLocale = 'zh';

function t(key) {
    return LOCALES[currentLocale][key] || key;
}

function setLocale(locale) {
    if (LOCALES[locale]) {
        currentLocale = locale;
    }
}

// ==================== CEFR 等级转换函数 ====================
function translateCefrLevel(cefr) {
    if (!cefr) return '';
    const upperCefr = cefr.toUpperCase();
    const cefrMap = {
        'A1': t('cefr_a1'),
        'A2': t('cefr_a2'),
        'B1': t('cefr_b1')
    };
    return cefrMap[upperCefr] || cefr;
}

// ==================== 标签转换映射表（使用国际化） ====================
function translateTag(tag) {
    const lowerTag = tag.toLowerCase();
    const tagMap = {
        'noun': 'tag_noun', 'verb': 'tag_verb', 'adj': 'tag_adj', 'adv': 'tag_adv',
        'prep': 'tag_prep', 'conj': 'tag_conj', 'pron': 'tag_pron', 'det': 'tag_det',
        'aux': 'tag_aux', 'art': 'tag_art', 'int': 'tag_int', 'part': 'tag_part',
        'abbrev': 'tag_abbrev', 'core': 'tag_core', 'idiom': 'tag_idiom', 'phrase': 'tag_phrase',
        'slang': 'tag_slang', 'formal': 'tag_formal', 'informal': 'tag_informal',
        'old-fashioned': 'tag_old_fashioned', 'rare': 'tag_rare', 'literary': 'tag_literary',
        'technical': 'tag_technical', 'a1': 'tag_a1', 'a2': 'tag_a2', 'b1': 'tag_b1',
        'function': 'tag_function', 'greeting': 'tag_greeting', 'food': 'tag_food',
        'family': 'tag_family', 'time': 'tag_time', 'place': 'tag_place', 'emotion': 'tag_emotion',
        'action': 'tag_action', 'travel': 'tag_travel', 'work': 'tag_work', 'study': 'tag_study',
        'body': 'tag_body', 'nature': 'tag_nature', 'color': 'tag_color', 'number': 'tag_number',
        'irregular': 'tag_irregular', 'phrasal': 'tag_phrasal'
    };
    if (tagMap[lowerTag]) {
        return t(tagMap[lowerTag]);
    }
    return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
}

function translateTags(tags) {
    if (!tags || !Array.isArray(tags)) return [];
    return tags.map(tag => translateTag(tag));
}

// ==================== 默认配置 ====================
const DEFAULT_SETTINGS = {
    apiUrl: 'http://127.0.0.1:5000/translate',
    sourceLang: 'auto',
    targetLang: 'zh',
    displayMode: 'below',
    vocabulary: {},
    pageSize: 20,
    language: 'zh',
    languagePresets: [
        { name: '中文 | Chinese', code: 'zh' },
        { name: 'English', code: 'en' },
        { name: '日语 | Japanese', code: 'ja' },
        { name: '韩语 | Korean', code: 'ko' },
        { name: '法语 | French', code: 'fr' },
        { name: '德语 | German', code: 'de' },
        { name: '西班牙语 | Spanish', code: 'es' },
        { name: '葡萄牙语 | Portuguese', code: 'pt' },
        { name: '俄语 | Russian', code: 'ru' },
        { name: '意大利语 | Italian', code: 'it' },
        { name: '阿拉伯语 | Arabic', code: 'ar' }
    ]
};

// ==================== 全局弹窗管理 ====================
let activeModal = null;
let activeOverlay = null;
let activeEditModal = null;
let activeEditOverlay = null;
let activeCardModal = null;
let activeCardOverlay = null;

function closeActiveModal() {
    if (activeModal) {
        activeModal.remove();
        activeModal = null;
    }
    if (activeOverlay) {
        activeOverlay.remove();
        activeOverlay = null;
    }
}

function closeActiveEditModal() {
    if (activeEditModal) {
        activeEditModal.remove();
        activeEditModal = null;
    }
    if (activeEditOverlay) {
        activeEditOverlay.remove();
        activeEditOverlay = null;
    }
}

function closeActiveCardModal() {
    if (activeCardModal) {
        activeCardModal.remove();
        activeCardModal = null;
    }
    if (activeCardOverlay) {
        activeCardOverlay.remove();
        activeCardOverlay = null;
    }
}

function createOverlay(onClick) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        z-index: 999;
    `;
    if (onClick) overlay.onclick = onClick;
    return overlay;
}

function centerModal(modal) {
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
}

// ==================== 词频转星星 ====================
function freqToStars(freq) {
    if (!freq && freq !== 0) return '';
    if (freq >= 80) return '⭐⭐⭐⭐⭐';
    if (freq >= 60) return '⭐⭐⭐⭐';
    if (freq >= 40) return '⭐⭐⭐';
    if (freq >= 20) return '⭐⭐';
    if (freq >= 1) return '⭐';
    return '';
}

// ==================== 获取CEFR标签颜色 ====================
function getCefrColor(cefr) {
    switch(cefr) {
        case 'A1': return '#4a6a3a';
        case 'A2': return '#5a6a3a';
        case 'B1': return '#6a5a3a';
        case 'B2': return '#7a4a3a';
        case 'C1': return '#8a3a3a';
        case 'C2': return '#9a2a2a';
        default: return '#4a5a6a';
    }
}

// ==================== 获取音标显示（仅当前语言） ====================
function getPhoneticDisplay(phonetic) {
    if (!phonetic) return '';
    const isChinese = currentLocale === 'zh';
    const parts = [];
    if (phonetic.uk) parts.push(isChinese ? `英 /${phonetic.uk}/` : `uk /${phonetic.uk}/`);
    if (phonetic.us) parts.push(isChinese ? `美 /${phonetic.us}/` : `us /${phonetic.us}/`);
    return parts.join(' · ');
}

// ==================== 单词本管理类 ====================
class VocabularyManager {
    constructor(plugin) {
        this.plugin = plugin;
    }

    lookUp(word, keepParentModal = false) {
        const lowerWord = word.toLowerCase().trim();
        const vocab = this.plugin.settings.vocabulary;
        
        let matchedKey = null;
        let matchedData = null;
        
        if (vocab[lowerWord]) {
            matchedKey = lowerWord;
            matchedData = vocab[lowerWord];
        } else if (vocab[word]) {
            matchedKey = word;
            matchedData = vocab[word];
        } else {
            const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            if (vocab[capitalized]) {
                matchedKey = capitalized;
                matchedData = vocab[capitalized];
            }
        }
        
        if (matchedData) {
            const wordData = this.normalizeWordData(matchedKey, matchedData);
            this.showWordCard(wordData, keepParentModal);
            return true;
        } else {
            this.showNotFoundDialog(word, keepParentModal);
            return false;
        }
    }

    normalizeWordData(word, data) {
        if (typeof data === 'string') {
            return {
                word: word, phonetic: { uk: '', us: '' }, pos: '', definition: data,
                examples: [], synonyms: [], antonyms: [], tags: [], freq: 0, cefr: ''
            };
        }
        
        let phonetic = { uk: '', us: '' };
        if (data.phonetic) {
            if (typeof data.phonetic === 'string') {
                phonetic = { uk: data.phonetic, us: data.phonetic };
            } else {
                phonetic = data.phonetic;
            }
        }
        
        return {
            word: word, phonetic: phonetic, pos: data.pos || '', definition: data.definition || '',
            examples: data.examples || [], synonyms: data.synonyms || [], antonyms: data.antonyms || [],
            tags: data.tags || [], freq: data.freq || 0, cefr: data.cefr || ''
        };
    }

    showWordCard(data, keepParentModal = false) {
        if (!keepParentModal) {
            closeActiveCardModal();
        } else {
            if (activeCardModal) {
                activeCardModal.remove();
                activeCardModal = null;
            }
            if (activeCardOverlay) {
                activeCardOverlay.remove();
                activeCardOverlay = null;
            }
        }
        
        const modal = document.createElement('div');
        modal.className = 'custom-translate-modal';
        modal.style.cssText = `
            background: var(--background-primary);
            border: 1px solid var(--background-modifier-border);
            border-radius: 12px;
            z-index: 1002;
            width: 460px;
            max-width: 88vw;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        `;
        centerModal(modal);
        
        const phoneticDisplay = getPhoneticDisplay(data.phonetic);
        const phoneticHtml = phoneticDisplay ? `<div style="color: var(--text-muted); font-size: 0.8em; margin-top: 4px;">${this.escapeHtml(phoneticDisplay)}</div>` : '';
        
        const stars = freqToStars(data.freq);
        const freqDisplay = stars ? `<span style="margin-left: 8px; font-size: 0.85em; letter-spacing: 1px;">${stars}</span>` : '';
        const cefrColor = getCefrColor(data.cefr);
        const cefrDisplayText = translateCefrLevel(data.cefr);
        const cefrDisplay = data.cefr ? `<span style="background: ${cefrColor}; padding: 2px 6px; border-radius: 10px; font-size: 0.65em; color: #e0e0e0;">${this.escapeHtml(cefrDisplayText)}</span>` : '';
        
        const translatedTags = translateTags(data.tags);
        const tagsHtml = translatedTags.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">${translatedTags.map(tag => `<span style="background: var(--background-modifier-hover); padding: 2px 8px; border-radius: 14px; font-size: 0.7em;">🏷️ ${this.escapeHtml(tag)}</span>`).join('')}</div>` : '';
        
        const examplesHtml = data.examples && data.examples.length > 0 ? data.examples.map(ex => `
            <div style="margin-bottom: 12px; padding: 8px 10px; background: var(--background-secondary); border-radius: 8px; border-left: 2px solid var(--interactive-accent);">
                <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
                    <span style="color: var(--text-muted); min-width: 20px; font-size: 0.85em;">📖</span>
                    <span style="color: var(--text-normal); font-family: monospace; flex: 1; line-height: 1.4; font-size: 0.9em;">${this.escapeHtml(ex.en)}</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <span style="color: var(--text-muted); min-width: 20px; font-size: 0.85em;">🌐</span>
                    <span style="color: var(--text-muted); font-size: 0.8em; flex: 1; line-height: 1.4;">${this.escapeHtml(ex.zh)}</span>
                </div>
            </div>
        `).join('') : `<div style="color: var(--text-muted); font-style: italic; padding: 12px; text-align: center; font-size: 0.85em;">${t('no_examples')}</div>`;
        
        modal.innerHTML = `
            <div style="position: sticky; top: 0; background: var(--background-primary); padding: 16px 18px 10px 18px; border-bottom: 1px solid var(--background-modifier-border); border-radius: 12px 12px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px;">
                            <h2 style="margin: 0; color: var(--text-accent); font-size: 1.5em; user-select: text; -webkit-user-select: text; cursor: text;">${this.escapeHtml(data.word)}</h2>
                            ${cefrDisplay}${freqDisplay}
                        </div>
                        ${phoneticHtml}
                        ${data.pos ? `<span style="background: var(--interactive-accent); color: white; padding: 2px 8px; border-radius: 14px; font-size: 0.7em; display: inline-block; margin-top: 8px;">${this.escapeHtml(data.pos)}</span>` : ''}
                        ${tagsHtml}
                    </div>
                    <button class="close-card" style="background: transparent; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); padding: 4px 6px; border-radius: 6px; transition: all 0.2s;">✕</button>
                </div>
            </div>
            <div style="padding: 14px 18px;">
                <div style="margin-bottom: 18px;">
                    <h4 style="margin: 0 0 6px 0; color: var(--text-normal); font-size: 0.85em; opacity: 0.7;">📖 ${t('definition')}</h4>
                    <div style="background: var(--background-secondary); padding: 10px 12px; border-radius: 8px; line-height: 1.5; font-size: 0.9em;">${this.escapeHtml(data.definition)}</div>
                </div>
                <div style="margin-bottom: 18px;">
                    <h4 style="margin: 0 0 6px 0; color: var(--text-normal); font-size: 0.85em; opacity: 0.7;">💬 ${t('examples')}</h4>
                    ${examplesHtml}
                </div>
                ${data.synonyms && data.synonyms.length > 0 ? `<div style="margin-bottom: 8px; padding: 6px 0; border-top: 1px solid var(--background-modifier-border); font-size: 0.8em;"><span style="color: var(--text-muted);">🔗 ${t('synonyms')}: </span><span style="color: var(--text-normal);">${data.synonyms.map(s => this.escapeHtml(s)).join(', ')}</span></div>` : ''}
                ${data.antonyms && data.antonyms.length > 0 ? `<div style="margin-bottom: 16px; padding: 6px 0; font-size: 0.8em;"><span style="color: var(--text-muted);">⚠️ ${t('antonyms')}: </span><span style="color: var(--text-normal);">${data.antonyms.map(a => this.escapeHtml(a)).join(', ')}</span></div>` : ''}
                <div style="display: flex; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--background-modifier-border);">
                    <button class="edit-word" style="flex: 1; padding: 8px; background: var(--interactive-normal); border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em;">✏️ ${t('edit')}</button>
                    <button class="delete-word" style="flex: 1; padding: 8px; background: var(--background-modifier-error); color: var(--text-error); border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em;">🗑️ ${t('delete')}</button>
                </div>
            </div>
        `;
        
        const closeBtn = modal.querySelector('.close-card');
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'var(--background-modifier-hover)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'transparent';
        });
        
        if (!keepParentModal) {
            const overlay = createOverlay(() => closeActiveCardModal());
            document.body.appendChild(overlay);
            activeCardOverlay = overlay;
        } else {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(2px);
                z-index: 1001;
            `;
            overlay.onclick = () => closeActiveCardModal();
            document.body.appendChild(overlay);
            activeCardOverlay = overlay;
        }
        
        document.body.appendChild(modal);
        activeCardModal = modal;
        
        const closeModal = () => closeActiveCardModal();
        
        modal.querySelector('.close-card').onclick = closeModal;
        modal.querySelector('.edit-word').onclick = () => {
            closeModal();
            this.editWord(data, null);
        };
        modal.querySelector('.delete-word').onclick = () => {
            if (confirm(`${t('confirm_delete')} "${data.word}" ?`)) {
                closeModal();
                this.removeWord(data.word);
            }
        };
    }

    showNotFoundDialog(word, keepParentModal = false) {
        if (!keepParentModal) {
            closeActiveCardModal();
            closeActiveModal();
        } else {
            if (activeCardModal) {
                activeCardModal.remove();
                activeCardModal = null;
            }
            if (activeCardOverlay) {
                activeCardOverlay.remove();
                activeCardOverlay = null;
            }
        }
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: var(--background-primary);
            border: 1px solid var(--background-modifier-border);
            border-radius: 12px;
            z-index: 1002;
            width: 340px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        `;
        centerModal(modal);
        
        modal.innerHTML = `<div style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="margin: 0; color: var(--text-error); font-size: 1.1em;">❌ ${t('word_not_found')}</h3>
                <button class="close-modal" style="background: transparent; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); padding: 2px 6px; border-radius: 4px;">✕</button>
            </div>
            <p style="margin-bottom: 20px; font-size: 0.9em;">"<strong>${this.escapeHtml(word)}</strong>" ${t('word_not_in_vocab')}</p>
            <div style="display: flex; gap: 10px;">
                <button class="add-word" style="flex: 1; padding: 8px; background: var(--interactive-accent); border: none; border-radius: 6px; cursor: pointer; color: white; font-size: 0.85em;">📝 ${t('add')}</button>
                <button class="close-modal" style="flex: 1; padding: 8px; background: var(--background-secondary); border: none; border-radius: 6px; cursor: pointer; font-size: 0.85em;">${t('cancel')}</button>
            </div>
        </div>`;
        
        const overlay = createOverlay(() => {
            if (!keepParentModal) closeActiveCardModal();
            else { modal.remove(); if (overlay) overlay.remove(); }
        });
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        activeCardModal = modal;
        activeCardOverlay = overlay;
        
        const closeModal = () => {
            if (activeCardModal) activeCardModal.remove();
            if (activeCardOverlay) activeCardOverlay.remove();
            activeCardModal = null;
            activeCardOverlay = null;
        };
        
        modal.querySelectorAll('.close-modal').forEach(btn => btn.onclick = closeModal);
        modal.querySelector('.add-word').onclick = () => {
            closeModal();
            this.addWordWithFullDialog(word, keepParentModal);
        };
    }

    editWord(data, refreshCallback) {
        closeActiveEditModal();
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: var(--background-primary);
            border: 1px solid var(--background-modifier-border);
            border-radius: 12px;
            z-index: 1003;
            width: 500px;
            max-width: 88vw;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        `;
        centerModal(modal);
        
        const examplesStr = data.examples && data.examples.length > 0 ? data.examples.map(ex => `${ex.en}|||${ex.zh}`).join('\n') : '';
        
        modal.innerHTML = `
            <div style="position: sticky; top: 0; background: var(--background-primary); padding: 14px 18px; border-bottom: 1px solid var(--background-modifier-border); border-radius: 12px 12px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.1em;">✏️ ${t('edit')}</h3>
                    <button class="close-edit-modal" style="background: transparent; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); padding: 2px 6px; border-radius: 4px;">✕</button>
                </div>
            </div>
            <div style="padding: 16px 18px;">
                <div style="margin-bottom: 12px;"><label style="display: block; margin-bottom: 4px; font-size: 0.85em;">${t('add')}</label><input type="text" id="edit-word" value="${this.escapeHtml(data.word)}" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('phonetic_uk')}</label><input type="text" id="edit-phonetic-uk" value="${this.escapeHtml(data.phonetic?.uk || '')}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('phonetic_us')}</label><input type="text" id="edit-phonetic-us" value="${this.escapeHtml(data.phonetic?.us || '')}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('pos')}</label><input type="text" id="edit-pos" value="${this.escapeHtml(data.pos)}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('definition')}</label><textarea id="edit-definition" rows="2" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;">${this.escapeHtml(data.definition)}</textarea></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('cefr')}</label><input type="text" id="edit-cefr" value="${this.escapeHtml(data.cefr || '')}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('freq')}</label><input type="number" id="edit-freq" value="${data.freq || 0}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('tags')}</label><input type="text" id="edit-tags" value="${data.tags ? data.tags.join(', ') : ''}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('examples_format')}</label><textarea id="edit-examples" rows="3" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.85em;">${this.escapeHtml(examplesStr)}</textarea></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('synonyms_format')}</label><input type="text" id="edit-synonyms" value="${data.synonyms ? data.synonyms.join(', ') : ''}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="margin-bottom: 16px;"><label style="font-size: 0.85em;">${t('antonyms_format')}</label><input type="text" id="edit-antonyms" value="${data.antonyms ? data.antonyms.join(', ') : ''}" style="width: 100%; padding: 8px; border-radius: 6px; font-size: 0.9em;"></div>
                <div style="display: flex; gap: 10px;">
                    <button class="save-edit-btn" style="flex:1;padding:8px;background:var(--interactive-accent);border:none;border-radius:6px;cursor:pointer;color:white;font-size:0.85em;">💾 ${t('save')}</button>
                    <button class="cancel-edit-btn" style="flex:1;padding:8px;background:var(--background-secondary);border:none;border-radius:6px;cursor:pointer;font-size:0.85em;">${t('cancel')}</button>
                </div>
            </div>
        `;
        
        const overlay = createOverlay(() => closeActiveEditModal());
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        activeEditModal = modal;
        activeEditOverlay = overlay;
        
        let isSaving = false;
        
        const closeEditModal = () => closeActiveEditModal();
        
        modal.querySelector('.close-edit-modal').onclick = closeEditModal;
        modal.querySelector('.cancel-edit-btn').onclick = closeEditModal;
        
        modal.querySelector('.save-edit-btn').onclick = async () => {
            if (isSaving) return;
            isSaving = true;
            
            const newWord = modal.querySelector('#edit-word').value.trim().toLowerCase();
            const newPhoneticUk = modal.querySelector('#edit-phonetic-uk').value.trim();
            const newPhoneticUs = modal.querySelector('#edit-phonetic-us').value.trim();
            const newPos = modal.querySelector('#edit-pos').value.trim();
            const newDefinition = modal.querySelector('#edit-definition').value.trim();
            const newCefr = modal.querySelector('#edit-cefr').value.trim();
            const newFreq = parseInt(modal.querySelector('#edit-freq').value) || 0;
            const tagsText = modal.querySelector('#edit-tags').value.trim();
            const examplesText = modal.querySelector('#edit-examples').value.trim();
            const synonymsText = modal.querySelector('#edit-synonyms').value.trim();
            const antonymsText = modal.querySelector('#edit-antonyms').value.trim();
            
            if (newWord && newDefinition) {
                const examples = [];
                if (examplesText) {
                    for (const line of examplesText.split('\n')) {
                        const parts = line.split('|||');
                        if (parts.length >= 2) examples.push({ en: parts[0].trim(), zh: parts[1].trim() });
                    }
                }
                const tags = tagsText ? tagsText.split(',').map(t => t.trim().toLowerCase()) : [];
                const synonyms = synonymsText ? synonymsText.split(',').map(s => s.trim()) : [];
                const antonyms = antonymsText ? antonymsText.split(',').map(a => a.trim()) : [];
                const phonetic = {};
                if (newPhoneticUk) phonetic.uk = newPhoneticUk;
                if (newPhoneticUs) phonetic.us = newPhoneticUs;
                const vocab = this.plugin.settings.vocabulary;
                delete vocab[data.word];
                vocab[newWord] = { word: newWord, phonetic, pos: newPos, definition: newDefinition, examples, synonyms, antonyms, tags, cefr: newCefr, freq: newFreq };
                await this.plugin.saveSettings();
                new Notice(`✅ ${t('updated')}: ${newWord}`);
                closeEditModal();
                if (refreshCallback) refreshCallback();
            } else {
                new Notice(`⚠️ ${t('please_fill_word_def')}`);
            }
            isSaving = false;
        };
    }

    addWordWithFullDialog(word, keepParentModal = false) {
        if (!keepParentModal) {
            closeActiveModal();
            closeActiveCardModal();
        } else {
            if (activeCardModal) {
                activeCardModal.remove();
                activeCardModal = null;
            }
            if (activeCardOverlay) {
                activeCardOverlay.remove();
                activeCardOverlay = null;
            }
        }
        closeActiveEditModal();
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: var(--background-primary);
            border: 1px solid var(--background-modifier-border);
            border-radius: 12px;
            z-index: 1002;
            width: 500px;
            max-width: 88vw;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        `;
        centerModal(modal);
        
        modal.innerHTML = `
            <div style="position: sticky; top: 0; background: var(--background-primary); padding: 14px 18px; border-bottom: 1px solid var(--background-modifier-border); border-radius: 12px 12px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.1em;">📝 ${t('add_to_vocab')}</h3>
                    <button class="close-modal" style="background: transparent; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); padding: 2px 6px; border-radius: 4px;">✕</button>
                </div>
            </div>
            <div style="padding: 16px 18px;">
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('add')}</label><input type="text" id="new-word" value="${this.escapeHtml(word)}" style="width:100%;padding:8px;border-radius:6px;border:1px solid var(--background-modifier-border);background:var(--background-secondary);font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('phonetic_uk')}</label><input type="text" id="new-phonetic-uk" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('phonetic_us')}</label><input type="text" id="new-phonetic-us" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('pos')}</label><input type="text" id="new-pos" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('definition')}</label><textarea id="new-definition" rows="2" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></textarea></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('cefr')}</label><input type="text" id="new-cefr" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('freq')}</label><input type="number" id="new-freq" value="0" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('tags')}</label><input type="text" id="new-tags" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('examples_format')}</label><textarea id="new-examples" rows="3" style="width:100%;padding:8px;border-radius:6px;font-size:0.85em;"></textarea></div>
                <div style="margin-bottom: 12px;"><label style="font-size: 0.85em;">${t('synonyms_format')}</label><input type="text" id="new-synonyms" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="margin-bottom: 16px;"><label style="font-size: 0.85em;">${t('antonyms_format')}</label><input type="text" id="new-antonyms" style="width:100%;padding:8px;border-radius:6px;font-size:0.9em;"></div>
                <div style="display: flex; gap: 10px;">
                    <button class="save-btn" style="flex:1;padding:8px;background:var(--interactive-accent);border:none;border-radius:6px;cursor:pointer;color:white;font-size:0.85em;">💾 ${t('save')}</button>
                    <button class="cancel-btn" style="flex:1;padding:8px;background:var(--background-secondary);border:none;border-radius:6px;cursor:pointer;font-size:0.85em;">${t('cancel')}</button>
                </div>
            </div>
        `;
        
        const overlay = createOverlay(() => {
            if (activeCardModal) activeCardModal.remove();
            if (activeCardOverlay) activeCardOverlay.remove();
            modal.remove();
            overlay.remove();
            activeCardModal = null;
            activeCardOverlay = null;
        });
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        let tempModal = modal;
        let tempOverlay = overlay;
        
        let isSaving = false;
        
        const closeModal = () => {
            if (tempModal) tempModal.remove();
            if (tempOverlay) tempOverlay.remove();
            tempModal = null;
            tempOverlay = null;
        };
        
        modal.querySelector('.close-modal').onclick = closeModal;
        modal.querySelector('.cancel-btn').onclick = closeModal;
        
        modal.querySelector('.save-btn').onclick = async () => {
            if (isSaving) return;
            isSaving = true;
            
            const newWord = modal.querySelector('#new-word').value.trim().toLowerCase();
            const newPhoneticUk = modal.querySelector('#new-phonetic-uk').value.trim();
            const newPhoneticUs = modal.querySelector('#new-phonetic-us').value.trim();
            const newPos = modal.querySelector('#new-pos').value.trim();
            const newDefinition = modal.querySelector('#new-definition').value.trim();
            const newCefr = modal.querySelector('#new-cefr').value.trim();
            const newFreq = parseInt(modal.querySelector('#new-freq').value) || 0;
            const tagsText = modal.querySelector('#new-tags').value.trim();
            const examplesText = modal.querySelector('#new-examples').value.trim();
            const synonymsText = modal.querySelector('#new-synonyms').value.trim();
            const antonymsText = modal.querySelector('#new-antonyms').value.trim();
            
            if (newWord && newDefinition) {
                const examples = [];
                if (examplesText) {
                    for (const line of examplesText.split('\n')) {
                        const parts = line.split('|||');
                        if (parts.length >= 2) examples.push({ en: parts[0].trim(), zh: parts[1].trim() });
                    }
                }
                const tags = tagsText ? tagsText.split(',').map(t => t.trim().toLowerCase()) : [];
                const synonyms = synonymsText ? synonymsText.split(',').map(s => s.trim()) : [];
                const antonyms = antonymsText ? antonymsText.split(',').map(a => a.trim()) : [];
                const phonetic = {};
                if (newPhoneticUk) phonetic.uk = newPhoneticUk;
                if (newPhoneticUs) phonetic.us = newPhoneticUs;
                await this.addWord(newWord, { word: newWord, phonetic, pos: newPos, definition: newDefinition, examples, synonyms, antonyms, tags, cefr: newCefr, freq: newFreq });
                closeModal();
            } else {
                new Notice(`⚠️ ${t('please_fill_word_def')}`);
            }
            isSaving = false;
        };
    }

    async addWord(word, wordData) {
        this.plugin.settings.vocabulary[word.toLowerCase()] = wordData;
        await this.plugin.saveSettings();
        new Notice(`✅ ${t('added')}: ${word}`);
    }

    async removeWord(word) {
        const vocab = this.plugin.settings.vocabulary;
        let targetWord = null;
        if (vocab[word]) targetWord = word;
        else if (vocab[word.toLowerCase()]) targetWord = word.toLowerCase();
        else if (vocab[word.toUpperCase()]) targetWord = word.toUpperCase();
        else if (vocab[word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()]) targetWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        if (targetWord) {
            delete vocab[targetWord];
            await this.plugin.saveSettings();
            new Notice(`🗑️ ${t('deleted')}: ${word}`);
            return true;
        } else {
            new Notice(`⚠️ ${t('word_not_found')}: "${word}"`);
            return false;
        }
    }

    getAllWords() { return this.plugin.settings.vocabulary; }
    async importWords(words) { Object.assign(this.plugin.settings.vocabulary, words); await this.plugin.saveSettings(); new Notice(`✅ ${t('import_complete')} (${Object.keys(words).length})`); }
    async exportWords() { const data = JSON.stringify(this.plugin.settings.vocabulary, null, 2); const blob = new Blob([data], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `vocabulary_${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(url); new Notice(`📤 ${t('exported')}`); }
    escapeHtml(text) { if (!text) return ''; const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
}

// ==================== 插件主类 ====================
class CustomTranslate extends Plugin {
    async onload() {
        await this.loadSettings();
        setLocale(this.settings.language);
        this.vocabManager = new VocabularyManager(this);
        this.refreshVocabularyManager = null;

        this.registerEvent(this.app.workspace.on('editor-menu', (menu, editor) => {
            const selectedText = editor.getSelection();
            if (selectedText) { this.addTranslationAndVocabularyItems(menu, selectedText, true); this.addLanguageSubmenu(menu, editor); }
        }));

        this.registerEvent(this.app.workspace.on('editor-menu', (menu) => {
            const selection = window.getSelection();
            const selectedText = selection?.toString().trim();
            if (selectedText && this.isInReadingMode()) { this.addTranslationAndVocabularyItems(menu, selectedText, false); this.addReadingModeLanguageSubmenu(menu); }
        }));

        this.addCommand({ id: 'translate-selected', name: `${t('translate')}`, callback: () => this.translateCurrentSelection() });
        this.addCommand({ id: 'lookup-word', name: `${t('lookup')}`, callback: () => { const text = this.getSelectedText(); if (text) this.vocabManager.lookUp(text); else new Notice(`⚠️ ${t('please_select_word')}`); } });
        this.addCommand({ id: 'add-word-to-vocab', name: `${t('add')}`, callback: () => { const text = this.getSelectedText(); if (text) this.vocabManager.addWordWithFullDialog(text); else new Notice(`⚠️ ${t('please_select_word')}`); } });
        this.addCommand({ id: 'open-vocabulary', name: `📚 ${t('open_vocab')}`, callback: () => this.openVocabularyManager() });

        for (const preset of this.settings.languagePresets) {
            this.addCommand({ id: `set-language-${preset.code}`, name: `${t('target_language')}: ${preset.name}`, callback: () => { this.settings.targetLang = preset.code; this.saveSettings(); this.updateStatusBar(); new Notice(`✅ ${t('target_language')}: ${preset.name}`); } });
        }

        this.addRibbonIcon('globe', `${t('translate')}`, () => this.translateCurrentSelection());
        this.addRibbonIcon('book', `${t('open_vocab')}`, () => this.openVocabularyManager());
        this.addSettingTab(new CustomTranslateSettingTab(this.app, this));
        this.addStatusBarItem();
    }
    
    addTranslationAndVocabularyItems(menu, selectedText, isEditMode) {
        menu.addItem((item) => item.setTitle(`${t('translate')}`).setIcon('languages').onClick(() => {
            if (isEditMode) { const editor = this.app.workspace.activeEditor?.editor; if (editor) this.translateAndDisplay(selectedText, editor); }
            else { const selection = window.getSelection(); this.translateAndDisplayInReadingMode(selectedText, selection); }
        }));
        menu.addSeparator();
        menu.addItem((item) => item.setTitle(`${t('lookup')}`).setIcon('search').onClick(() => this.vocabManager.lookUp(selectedText)));
        menu.addItem((item) => item.setTitle(`${t('add')}`).setIcon('plus').onClick(() => this.vocabManager.addWordWithFullDialog(selectedText)));
    }

    getSelectedText() {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView && activeView.getMode() === 'source') return activeView.editor.getSelection();
        else { const selection = window.getSelection(); return selection?.toString().trim(); }
    }

    isInReadingMode() { const activeView = this.app.workspace.getActiveViewOfType(MarkdownView); return activeView && activeView.getMode() === 'preview'; }

    openVocabularyManager() {
        closeActiveModal();
        closeActiveEditModal();
        closeActiveCardModal();
        
        const vocab = this.vocabManager.getAllWords();
        let wordList = Object.entries(vocab);
        let currentSort = 'word_asc';
        let currentPage = 1;
        let currentPageSize = this.settings.pageSize || 20;
        let currentSearchTerm = '';
        
        const sortWords = (sortType) => {
            currentSort = sortType;
            currentPage = 1;
            if (sortType === 'word_asc') {
                wordList.sort((a, b) => a[0].localeCompare(b[0]));
            } else if (sortType === 'word_desc') {
                wordList.sort((a, b) => b[0].localeCompare(a[0]));
            } else if (sortType === 'freq_asc') {
                wordList.sort((a, b) => {
                    const freqA = a[1]?.freq || 0;
                    const freqB = b[1]?.freq || 0;
                    return freqA - freqB;
                });
            } else if (sortType === 'freq_desc') {
                wordList.sort((a, b) => {
                    const freqA = a[1]?.freq || 0;
                    const freqB = b[1]?.freq || 0;
                    return freqB - freqA;
                });
            }
            updateSortButtonIcon();
            renderList();
        };
        
        const toggleWordSort = () => {
            if (currentSort === 'word_asc') {
                sortWords('word_desc');
            } else if (currentSort === 'word_desc') {
                sortWords('word_asc');
            } else {
                sortWords('word_asc');
            }
        };
        
        const toggleFreqSort = () => {
            if (currentSort === 'freq_asc') {
                sortWords('freq_desc');
            } else if (currentSort === 'freq_desc') {
                sortWords('freq_asc');
            } else {
                sortWords('freq_desc');
            }
        };
        
        const updateSortButtonIcon = () => {
            const modalEl = document.querySelector('.vocab-manager-modal');
            if (!modalEl) return;
            const sortWordBtn = modalEl.querySelector('#sort-word');
            const sortFreqBtn = modalEl.querySelector('#sort-freq');
            
            if (sortWordBtn) {
                if (currentSort === 'word_asc') {
                    sortWordBtn.innerHTML = `🔤 ${t('word')} ↑`;
                } else if (currentSort === 'word_desc') {
                    sortWordBtn.innerHTML = `🔤 ${t('word')} ↓`;
                } else {
                    sortWordBtn.innerHTML = `🔤 ${t('word')}`;
                }
                if (currentSort === 'word_asc' || currentSort === 'word_desc') {
                    sortWordBtn.style.background = '#5a6a7a';
                    sortWordBtn.style.color = 'white';
                } else {
                    sortWordBtn.style.background = 'var(--background-secondary)';
                    sortWordBtn.style.color = 'var(--text-normal)';
                }
            }
            
            if (sortFreqBtn) {
                if (currentSort === 'freq_asc') {
                    sortFreqBtn.innerHTML = `⭐ ${t('frequency')} ↑`;
                } else if (currentSort === 'freq_desc') {
                    sortFreqBtn.innerHTML = `⭐ ${t('frequency')} ↓`;
                } else {
                    sortFreqBtn.innerHTML = `⭐ ${t('frequency')}`;
                }
                if (currentSort === 'freq_asc' || currentSort === 'freq_desc') {
                    sortFreqBtn.style.background = '#5a6a7a';
                    sortFreqBtn.style.color = 'white';
                } else {
                    sortFreqBtn.style.background = 'var(--background-secondary)';
                    sortFreqBtn.style.color = 'var(--text-normal)';
                }
            }
        };
        
        const filterBySearch = () => {
            if (!currentSearchTerm) return wordList;
            return wordList.filter(([word, data]) => word.toLowerCase().includes(currentSearchTerm.toLowerCase()));
        };
        
        const refreshList = () => {
            const currentVocab = this.settings.vocabulary;
            wordList = Object.entries(currentVocab);
            if (currentSort === 'word_asc') {
                wordList.sort((a, b) => a[0].localeCompare(b[0]));
            } else if (currentSort === 'word_desc') {
                wordList.sort((a, b) => b[0].localeCompare(a[0]));
            } else if (currentSort === 'freq_asc') {
                wordList.sort((a, b) => {
                    const freqA = a[1]?.freq || 0;
                    const freqB = b[1]?.freq || 0;
                    return freqA - freqB;
                });
            } else if (currentSort === 'freq_desc') {
                wordList.sort((a, b) => {
                    const freqA = a[1]?.freq || 0;
                    const freqB = b[1]?.freq || 0;
                    return freqB - freqA;
                });
            }
            renderList();
        };
        
        const renderList = () => {
            const listContainer = modal.querySelector('#vocab-list');
            const pageInfoSpan = modal.querySelector('#page-info');
            const totalCountSpan = modal.querySelector('#total-count');
            const currentPageSizeVal = currentPageSize;
            
            let filteredList = filterBySearch();
            const totalPages = Math.ceil(filteredList.length / currentPageSizeVal) || 1;
            if (currentPage > totalPages) currentPage = totalPages;
            const start = (currentPage - 1) * currentPageSizeVal;
            const end = start + currentPageSizeVal;
            const pageList = filteredList.slice(start, end);
            
            if (totalCountSpan) totalCountSpan.textContent = filteredList.length;
            if (pageInfoSpan) pageInfoSpan.textContent = `${currentPage} / ${totalPages}`;
            
            if (filteredList.length === 0) {
                listContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 0.9em;">📭 ${t('no_words')}</div>`;
            } else {
                listContainer.innerHTML = pageList.map(([word, data]) => {
                    const wordData = typeof data === 'string' ? { definition: data, phonetic: { uk: '', us: '' }, pos: '', freq: 0, cefr: '', tags: [] } : data;
                    const stars = freqToStars(wordData.freq);
                    let phoneticDisplay = '';
                    if (wordData.phonetic?.us || wordData.phonetic?.uk) {
                        const parts = [];
                        if (wordData.phonetic?.uk) parts.push(`英 /${wordData.phonetic.uk}/`);
                        if (wordData.phonetic?.us) parts.push(`美 /${wordData.phonetic.us}/`);
                        phoneticDisplay = parts.join(' · ');
                    }
                    const cefrColor = getCefrColor(wordData.cefr);
                    const cefrDisplayText = translateCefrLevel(wordData.cefr);
                    const escapedWord = this.vocabManager.escapeHtml(word);
                    return `<div class="vocab-item" data-word="${escapedWord}" style="padding: 10px 0; border-bottom: 1px solid var(--background-modifier-border); display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1; user-select: text; cursor: text;">
                            <div style="display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; margin-bottom: 4px;">
                                <strong style="font-size: 1em; color: var(--text-accent);">${escapedWord}</strong>
                                ${stars ? `<span style="font-size: 0.75em; letter-spacing: 1px;">${stars}</span>` : ''}
                                ${wordData.cefr ? `<span style="background: ${cefrColor}; padding: 2px 5px; border-radius: 8px; font-size: 0.6em; color: #e0e0e0;">${this.vocabManager.escapeHtml(cefrDisplayText)}</span>` : ''}
                                ${phoneticDisplay ? `<span style="color: var(--text-muted); font-family: monospace; font-size: 0.75em;">${phoneticDisplay}</span>` : ''}
                                ${wordData.pos ? `<span style="background: var(--background-modifier-hover); padding: 2px 5px; border-radius: 8px; font-size: 0.65em;">${this.vocabManager.escapeHtml(wordData.pos)}</span>` : ''}
                            </div>
                            <div style="color: var(--text-muted); font-size: 0.78em; line-height: 1.3;">${this.vocabManager.escapeHtml(wordData.definition)}</div>
                        </div>
                        <div style="display: flex; gap: 6px;">
                            <button class="edit-vocab" data-word="${escapedWord}" style="padding: 4px 10px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.75em;">✏️</button>
                            <button class="delete-vocab" data-word="${escapedWord}" style="padding: 4px 10px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-error); background: var(--background-secondary); color: var(--text-error); font-size: 0.75em;">🗑️</button>
                        </div>
                    </div>`;
                }).join('');
            }
            
            const prevBtn = modal.querySelector('#prev-page');
            const nextBtn = modal.querySelector('#next-page');
            if (prevBtn) prevBtn.disabled = currentPage <= 1;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
            
            modal.querySelectorAll('.edit-vocab').forEach(btn => {
                btn.onclick = async (e) => {
                    e.stopPropagation();
                    const word = btn.getAttribute('data-word');
                    const wordData = this.vocabManager.normalizeWordData(word, this.settings.vocabulary[word.toLowerCase()]);
                    this.vocabManager.editWord(wordData, refreshList);
                };
            });
            
            modal.querySelectorAll('.delete-vocab').forEach(btn => {
                btn.onclick = async (e) => {
                    e.stopPropagation();
                    const word = btn.getAttribute('data-word');
                    if (confirm(`${t('confirm_delete')} "${word}" ?`)) {
                        await this.vocabManager.removeWord(word);
                        refreshList();
                    }
                };
            });
        };
        
        const modal = document.createElement('div');
        modal.className = 'vocab-manager-modal';
        modal.style.cssText = `
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 85%;
            max-width: 950px;
            height: 75%;
            background: var(--background-primary);
            border: 1px solid var(--background-modifier-border);
            border-radius: 12px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        `;
        
        modal.innerHTML = `
            <div style="padding: 14px 18px; border-bottom: 1px solid var(--background-modifier-border); display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; font-size: 1.3em;">📚 ${t('open_vocab')}</h2>
                <button class="close-vocab" style="background: transparent; border: none; cursor: pointer; font-size: 18px; color: var(--text-muted); padding: 2px 6px; border-radius: 5px;">✕</button>
            </div>
            <div style="padding: 10px 18px; background: var(--background-secondary); border-bottom: 1px solid var(--background-modifier-border); display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; gap: 12px; align-items: center; font-size: 0.75em; color: var(--text-muted);">
                    <span>💡 <strong>${t('tip_double_click')}</strong></span>
                    <span>⌨️ <strong>${t('tip_hotkey')}</strong></span>
                    <span>✏️ <strong>${t('tip_edit')}</strong></span>
                </div>
            </div>
            <div style="padding: 10px 18px; border-bottom: 1px solid var(--background-modifier-border); display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <input type="text" id="search-word" placeholder="${t('search_placeholder')}" style="flex: 2; min-width: 140px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.85em;">
                <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                    <button id="sort-word" class="sort-btn" style="padding: 5px 10px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.8em;">🔤 ${t('word')}</button>
                    <button id="sort-freq" class="sort-btn" style="padding: 5px 10px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.8em;">⭐ ${t('frequency')}</button>
                </div>
                <select id="page-size-select" style="padding: 5px 8px; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.8em;">
                    <option value="5">5 / ${t('words')}</option>
                    <option value="10">10 / ${t('words')}</option>
                    <option value="20">20 / ${t('words')}</option>
                    <option value="50">50 / ${t('words')}</option>
                    <option value="100">100 / ${t('words')}</option>
                    <option value="1000">1000 / ${t('words')}</option>
                </select>
                <div style="flex: 1; display: flex; gap: 6px; justify-content: flex-end;">
                    <button id="export-vocab" style="padding: 5px 12px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.8em;">📤 ${t('export')}</button>
                    <button id="import-vocab" style="padding: 5px 12px; cursor: pointer; border-radius: 5px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.8em;">📥 ${t('import')}</button>
                    <button id="add-word" style="padding: 5px 12px; cursor: pointer; border-radius: 5px; background: var(--interactive-accent); color: white; border: none; font-size: 0.8em;">+ ${t('add')}</button>
                </div>
            </div>
            <div id="vocab-list" style="flex: 1; overflow-y: auto; padding: 8px 18px;"></div>
            <div style="padding: 8px 18px; border-top: 1px solid var(--background-modifier-border); display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.75em;">
                <div>📊 ${t('total_words')} <span id="total-count">0</span> ${t('words')}</div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button id="prev-page" style="padding: 3px 10px; cursor: pointer; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.75em;" disabled>◀ ${t('prev')}</button>
                    <span id="page-info">1 / 1</span>
                    <button id="next-page" style="padding: 3px 10px; cursor: pointer; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); font-size: 0.75em;" disabled>${t('next')} ▶</button>
                </div>
            </div>
        `;
        
        const overlay = createOverlay(() => closeActiveModal());
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        activeModal = modal;
        activeOverlay = overlay;
        
        const closeModal = () => {
            closeActiveModal();
        };
        
        modal.querySelector('.close-vocab').onclick = closeModal;
        
        const pageSizeSelect = modal.querySelector('#page-size-select');
        if (pageSizeSelect) {
            pageSizeSelect.value = currentPageSize.toString();
            pageSizeSelect.onchange = async (e) => {
                currentPageSize = parseInt(e.target.value);
                this.settings.pageSize = currentPageSize;
                await this.saveSettings();
                currentPage = 1;
                renderList();
            };
        }
        
        sortWords('word_asc');
        
        const searchInput = modal.querySelector('#search-word');
        searchInput.oninput = (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            currentPage = 1;
            renderList();
        };
        
        modal.querySelector('#prev-page').onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderList();
            }
        };
        modal.querySelector('#next-page').onclick = () => {
            const filteredList = filterBySearch();
            const totalPages = Math.ceil(filteredList.length / currentPageSize);
            if (currentPage < totalPages) {
                currentPage++;
                renderList();
            }
        };
        
        modal.querySelector('#sort-word').onclick = () => toggleWordSort();
        modal.querySelector('#sort-freq').onclick = () => toggleFreqSort();
        
        modal.querySelector('#export-vocab').onclick = () => this.vocabManager.exportWords();
        modal.querySelector('#import-vocab').onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const text = await file.text();
                    try {
                        const imported = JSON.parse(text);
                        await this.vocabManager.importWords(imported);
                        refreshList();
                        new Notice(`✅ ${t('import_complete')}`);
                    } catch (err) { new Notice(`❌ ${t('import_failed')}`); }
                }
            };
            input.click();
        };
        modal.querySelector('#add-word').onclick = () => { 
            this.vocabManager.addWordWithFullDialog('', true);
            const checkInterval = setInterval(() => {
                if (!activeCardModal) {
                    refreshList();
                    clearInterval(checkInterval);
                }
            }, 200);
        };
    }

    addLanguageSubmenu(menu, editor) {
        const submenu = menu.addSubmenu();
        submenu.setTitle(`${t('target_language')}`);
        submenu.setIcon('switch');
        for (const preset of this.settings.languagePresets) {
            submenu.addItem((item) => item.setTitle(`${preset.name} ${this.settings.targetLang === preset.code ? '✓' : ''}`).onClick(() => { this.settings.targetLang = preset.code; this.saveSettings(); this.updateStatusBar(); new Notice(`✅ ${t('target_language')}: ${preset.name}`); }));
        }
        submenu.addSeparator();
        submenu.addItem((item) => item.setTitle(`自定义 | Custom...`).setIcon('pencil').onClick(() => { this.showCustomLanguageInputForMenu(); }));
    }

    addReadingModeLanguageSubmenu(menu) {
        const submenu = menu.addSubmenu();
        submenu.setTitle(`${t('target_language')}`);
        submenu.setIcon('switch');
        for (const preset of this.settings.languagePresets) {
            submenu.addItem((item) => item.setTitle(`${preset.name} ${this.settings.targetLang === preset.code ? '✓' : ''}`).onClick(() => { this.settings.targetLang = preset.code; this.saveSettings(); this.updateStatusBar(); new Notice(`✅ ${t('target_language')}: ${preset.name}`); }));
        }
        submenu.addSeparator();
        submenu.addItem((item) => item.setTitle(`自定义 | Custom...`).setIcon('pencil').onClick(() => { this.showCustomLanguageInputForMenu(); }));
    }

    async showCustomLanguageInputForMenu() {
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--background-primary); border: 1px solid var(--background-modifier-border); border-radius: 10px; padding: 18px; z-index: 1000; min-width: 280px; box-shadow: 0 6px 18px rgba(0,0,0,0.15);`;
        inputContainer.innerHTML = `<h4 style="margin-top: 0;">${t('target_language')}</h4><p style="color: var(--text-muted); font-size: 0.85em;">${t('api_desc')} (zh, en, ja, fr...)</p><input type="text" id="lang-input" placeholder="zh" style="width: 100%; padding: 8px; margin: 10px 0; border-radius: 6px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); color: var(--text-normal);"><div style="display: flex; gap: 10px; justify-content: flex-end;"><button id="cancel-btn" style="padding: 6px 12px; border-radius: 5px; background: var(--background-secondary); border: none; cursor: pointer;">${t('cancel')}</button><button id="confirm-btn" style="padding: 6px 12px; background: var(--interactive-accent); color: white; border: none; border-radius: 5px; cursor: pointer;">${t('save')}</button></div>`;
        document.body.appendChild(inputContainer);
        const input = inputContainer.querySelector('#lang-input');
        input.focus();
        const cleanup = () => { inputContainer.remove(); if (overlay) overlay.remove(); };
        const confirmBtn = inputContainer.querySelector('#confirm-btn');
        const cancelBtn = inputContainer.querySelector('#cancel-btn');
        const overlay = createOverlay(() => cleanup());
        document.body.appendChild(overlay);
        confirmBtn.onclick = () => { const langCode = input.value.trim().toLowerCase(); if (langCode) { this.settings.targetLang = langCode; this.saveSettings(); this.updateStatusBar(); new Notice(`✅ ${t('target_language')}: ${langCode}`); } cleanup(); };
        cancelBtn.onclick = cleanup;
    }

    getLanguageName(code) { const preset = this.settings.languagePresets.find(p => p.code === code); return preset ? preset.name : code; }

    addStatusBarItem() {
        const statusBarItem = super.addStatusBarItem();
        statusBarItem.addClass('plugin-custom-translate');
        statusBarItem.setText(`🌐 ${t('target_language')}: ${this.getLanguageName(this.settings.targetLang)}`);
        statusBarItem.setAttribute('aria-label', `${t('target_language')}`);
        statusBarItem.style.cursor = 'pointer';
        
        statusBarItem.onClickEvent(async (e) => {
            const menu = new Menu();
            for (const preset of this.settings.languagePresets) {
                menu.addItem((item) => item.setTitle(`${preset.name} ${this.settings.targetLang === preset.code ? '✓' : ''}`).setIcon(this.settings.targetLang === preset.code ? 'checkmark' : 'languages').onClick(() => { this.settings.targetLang = preset.code; this.saveSettings(); statusBarItem.setText(`🌐 ${t('target_language')}: ${preset.name}`); new Notice(`✅ ${t('target_language')}: ${preset.name}`); }));
            }
            menu.addSeparator();
            menu.addItem((item) => item.setTitle(`自定义 | Custom...`).setIcon('pencil').onClick(() => { this.showCustomLanguageInputForStatusBar(statusBarItem); }));
            menu.showAtMouseEvent(e);
        });
        this.statusBarItem = statusBarItem;
    }

    async showCustomLanguageInputForStatusBar(statusBarItem) {
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--background-primary); border: 1px solid var(--background-modifier-border); border-radius: 10px; padding: 18px; z-index: 1000; min-width: 280px; box-shadow: 0 6px 18px rgba(0,0,0,0.15);`;
        inputContainer.innerHTML = `<h4 style="margin-top: 0;">${t('target_language')}</h4><p style="color: var(--text-muted); font-size: 0.85em;">${t('api_desc')} (zh, en, ja, fr...)</p><input type="text" id="lang-input" placeholder="zh" style="width: 100%; padding: 8px; margin: 10px 0; border-radius: 6px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); color: var(--text-normal);"><div style="display: flex; gap: 10px; justify-content: flex-end;"><button id="cancel-btn" style="padding: 6px 12px; border-radius: 5px; background: var(--background-secondary); border: none; cursor: pointer;">${t('cancel')}</button><button id="confirm-btn" style="padding: 6px 12px; background: var(--interactive-accent); color: white; border: none; border-radius: 5px; cursor: pointer;">${t('save')}</button></div>`;
        document.body.appendChild(inputContainer);
        const input = inputContainer.querySelector('#lang-input');
        input.focus();
        const cleanup = () => { inputContainer.remove(); if (overlay) overlay.remove(); };
        const confirmBtn = inputContainer.querySelector('#confirm-btn');
        const cancelBtn = inputContainer.querySelector('#cancel-btn');
        const overlay = createOverlay(() => cleanup());
        document.body.appendChild(overlay);
        confirmBtn.onclick = () => { const langCode = input.value.trim().toLowerCase(); if (langCode) { this.settings.targetLang = langCode; this.saveSettings(); statusBarItem.setText(`🌐 ${t('target_language')}: ${langCode}`); new Notice(`✅ ${t('target_language')}: ${langCode}`); } cleanup(); };
        cancelBtn.onclick = cleanup;
    }

    updateStatusBar() { 
        if (this.statusBarItem) {
            this.statusBarItem.setText(`🌐 ${t('target_language')}: ${this.getLanguageName(this.settings.targetLang)}`);
        }
    }

    async translateAndDisplayInReadingMode(text, selection) {
        const langName = this.getLanguageName(this.settings.targetLang);
        new Notice(`🌐 ${t('translating')} ${langName}...`);
        try {
            const translated = await this.callTranslateApi(text);
            if (translated) { this.insertTranslationCard(translated, selection); new Notice(`✅ ${t('translation_complete')}`); }
            else { new Notice(`⚠️ ${t('translation_empty')}`); }
        } catch (err) { new Notice(`❌ ${t('translation_failed')}: ${err.message}`); }
    }

    insertTranslationCard(translatedText, selection) {
        const range = selection.getRangeAt(0);
        const card = document.createElement('div');
        card.className = 'local-translate-result';
        Object.assign(card.style, { marginTop: '8px', marginBottom: '8px', padding: '8px 12px', backgroundColor: 'var(--background-secondary)', borderLeft: '3px solid var(--interactive-accent)', borderRadius: '6px', fontSize: '0.85em' });
        const langName = this.getLanguageName(this.settings.targetLang);
        const headerDiv = document.createElement('div');
        headerDiv.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 6px;';
        headerDiv.innerHTML = `<span style="font-size: 0.7em; color: var(--text-faint);">📖 ${t('translate')} (${langName})</span><button class="copy-btn" style="background: none; border: none; cursor: pointer; font-size: 0.65em; color: var(--text-muted); padding: 2px 6px; border-radius: 4px;">📋 ${t('copied')}</button><button class="close-btn" style="background: none; border: none; cursor: pointer; font-size: 0.65em; color: var(--text-muted); padding: 2px 6px; border-radius: 4px; margin-left: auto;">✕</button>`;
        const textDiv = document.createElement('div');
        textDiv.style.cssText = 'line-height: 1.4;';
        const lines = translatedText.split(/\r?\n/);
        lines.forEach((line, index) => { if (index > 0) textDiv.appendChild(document.createElement('br')); textDiv.appendChild(document.createTextNode(line)); });
        card.appendChild(headerDiv);
        card.appendChild(textDiv);
        range.collapse(false);
        range.insertNode(card);
        card.querySelector('.copy-btn').onclick = (e) => { e.stopPropagation(); navigator.clipboard.writeText(translatedText); new Notice(`📋 ${t('copied')}`); };
        card.querySelector('.close-btn').onclick = (e) => { e.stopPropagation(); card.remove(); };
    }

    async translateCurrentSelection() {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeView) { new Notice(`⚠️ ${t('translation_empty')}`); return; }
        if (activeView.getMode() === 'source') {
            const editor = activeView.editor;
            const selectedText = editor.getSelection();
            if (!selectedText) { new Notice(`⚠️ ${t('please_select_word')}`); return; }
            await this.translateAndDisplay(selectedText, editor);
        } else {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            if (!selectedText) { new Notice(`⚠️ ${t('please_select_word')}`); return; }
            await this.translateAndDisplayInReadingMode(selectedText, selection);
        }
    }

    async translateAndDisplay(text, editor) {
        const langName = this.getLanguageName(this.settings.targetLang);
        new Notice(`🌐 ${t('translating')} ${langName}...`);
        try {
            const translated = await this.callTranslateApi(text);
            if (translated) {
                if (this.settings.displayMode === 'replace') editor.replaceSelection(translated);
                else { const cursor = editor.getCursor('to'); editor.replaceRange(`\n${translated}`, cursor); }
                new Notice(`✅ ${t('translation_complete')}`);
            } else { new Notice(`⚠️ ${t('translation_empty')}`); }
        } catch (err) { new Notice(`❌ ${t('translation_failed')}: ${err.message}`); }
    }

    async callTranslateApi(text) {
        const { apiUrl, sourceLang, targetLang } = this.settings;
        try {
            const response = await requestUrl({
                url: apiUrl,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ q: text, source: sourceLang, target: targetLang })
            });
            
            if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
            const data = response.json;
            if (data.translatedText) return data.translatedText;
            if (data.translated_text) return data.translated_text;
            if (data.result) return data.result;
            return JSON.stringify(data);
        } catch (err) {
            throw err;
        }
    }

    async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); setLocale(this.settings.language); }
    async saveSettings() { await this.saveData(this.settings); }
}

// ==================== 设置页面 ====================
class CustomTranslateSettingTab extends PluginSettingTab {
    constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
    
    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: t('settings_title') });
        
        // 界面语言设置
        containerEl.createEl('h3', { text: '🌐 ' + t('interface_language') });
        new Setting(containerEl)
            .setName(t('interface_language'))
            .setDesc(t('interface_language_desc'))
            .addDropdown(dropdown => dropdown
                .addOption('zh', t('chinese'))
                .addOption('en', t('english'))
                .setValue(this.plugin.settings.language || 'zh')
                .onChange(async (value) => {
                    this.plugin.settings.language = value;
                    setLocale(value);
                    await this.plugin.saveSettings();
                    this.display();
                    new Notice(`✅ ${t('interface_language')}: ${value === 'zh' ? t('chinese') : t('english')}`);
                }));
        
        containerEl.createEl('hr');
        
        // 部署说明区块（仅保留 Docker）- 增加间距
        containerEl.createEl('h3', { text: '🚀 ' + t('deploy_title') });
        const deployDesc = containerEl.createDiv();
        deployDesc.createEl('p', { text: t('deploy_desc') });
        deployDesc.style.marginBottom = '16px';
        
        // Docker 部署 - 命令换行显示
        const dockerSection = containerEl.createDiv();
        dockerSection.style.marginBottom = '12px';
        dockerSection.createEl('strong', { text: '🐳 ' + t('docker_cmd') });
        
        // 命令容器，支持换行
        const dockerCodeContainer = dockerSection.createDiv();
        dockerCodeContainer.style.cssText = 'background: var(--background-secondary); padding: 12px; border-radius: 6px; margin: 8px 0; overflow-x: auto; white-space: normal; word-break: break-all;';
        const dockerCode = dockerCodeContainer.createEl('code');
        dockerCode.style.cssText = 'white-space: pre-wrap; word-break: break-all; font-size: 0.85em;';
        dockerCode.setText('docker run -d --name libretranslate -p 5000:5000 -m 1.5g --memory-swap 1.5g libretranslate/libretranslate:v1.9.5 --load-only en,zh');
        
        // 配置说明 - 增加上下间距
        const afterDeploy = containerEl.createDiv();
        afterDeploy.style.marginTop = '16px';
        afterDeploy.style.marginBottom = '16px';
        afterDeploy.createEl('p', { text: t('after_deploy'), style: 'color: var(--text-accent); margin: 0;' });
        
        // 文档链接按钮
        new Setting(containerEl)
            .setName(t('view_docs'))
            .setDesc('https://github.com/LibreTranslate/LibreTranslate')
            .addButton(btn => btn.setButtonText('🔗 ' + t('view_docs'))
                .onClick(() => {
                    const { shell } = require('electron');
                    shell.openExternal('https://github.com/LibreTranslate/LibreTranslate');
                }));
        
        containerEl.createEl('hr');
        
        containerEl.createEl('h3', { text: '🔌 ' + t('api_settings') });
        new Setting(containerEl).setName(t('api_url')).setDesc(t('api_desc')).addText(text => text.setPlaceholder('http://127.0.0.1:5000/translate').setValue(this.plugin.settings.apiUrl).onChange(async (value) => { this.plugin.settings.apiUrl = value; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName(t('source_lang')).setDesc(t('source_desc')).addText(text => text.setPlaceholder('auto').setValue(this.plugin.settings.sourceLang).onChange(async (value) => { this.plugin.settings.sourceLang = value || 'auto'; await this.plugin.saveSettings(); }));
        
        containerEl.createEl('h3', { text: '📝 ' + t('translation_settings') });
        new Setting(containerEl).setName(t('display_mode')).setDesc(t('display_desc')).addDropdown(dropdown => dropdown.addOption('below', t('display_below')).addOption('replace', t('display_replace')).setValue(this.plugin.settings.displayMode).onChange(async (value) => { this.plugin.settings.displayMode = value; await this.plugin.saveSettings(); }));
        
        containerEl.createEl('h3', { text: '🌍 ' + t('language_presets') });
        const langContainer = containerEl.createDiv();
        for (let i = 0; i < this.plugin.settings.languagePresets.length; i++) {
            const preset = this.plugin.settings.languagePresets[i];
            const index = i;
            new Setting(langContainer).setName(preset.name).setDesc(`Code: ${preset.code}`).addButton(btn => btn.setButtonText(t('delete')).setWarning().onClick(async () => { this.plugin.settings.languagePresets.splice(index, 1); await this.plugin.saveSettings(); this.display(); new Notice(`✅ ${t('delete')}`); }));
        }
        let newLangName = '', newLangCode = '';
        new Setting(langContainer).setName(t('add')).setDesc(t('language_presets')).addText(text => text.setPlaceholder(t('add')).onChange(value => newLangName = value)).addText(text => text.setPlaceholder('code').onChange(value => newLangCode = value)).addButton(btn => btn.setButtonText(t('add')).onClick(async () => { if (newLangName && newLangCode) { this.plugin.settings.languagePresets.push({ name: newLangName, code: newLangCode }); await this.plugin.saveSettings(); this.display(); new Notice(`✅ ${t('add')}`); } else { new Notice(`⚠️ ${t('please_fill_word_def')}`); } }));
        
        containerEl.createEl('h3', { text: '📚 ' + t('vocab_management') });
        const wordCount = Object.keys(this.plugin.settings.vocabulary).length;
        containerEl.createEl('p', { text: `📊 ${t('total_words')} ${wordCount} ${t('words')}` });
        new Setting(containerEl).setName(t('open_vocab')).setDesc(t('open_vocab_desc')).addButton(btn => btn.setButtonText(t('open_vocab')).setCta().onClick(() => { this.plugin.openVocabularyManager(); }));
        new Setting(containerEl).setName(t('items_per_page')).setDesc(t('items_per_page_desc')).addDropdown(dropdown => dropdown.addOption('5', '5').addOption('10', '10').addOption('20', '20').addOption('50', '50').addOption('100', '100').addOption('1000', '1000').setValue(String(this.plugin.settings.pageSize || 20)).onChange(async (value) => { this.plugin.settings.pageSize = parseInt(value); await this.plugin.saveSettings(); new Notice(`✅ ${t('items_per_page')}: ${value}`); }));
        
        containerEl.createEl('h3', { text: '🔧 ' + t('connection_test') });
        new Setting(containerEl).setName(t('test_connection')).setDesc(t('test_desc')).addButton(btn => btn.setButtonText(t('test_connection')).setCta().onClick(async () => { new Notice(`🔄 ${t('testing')}`); try { const response = await requestUrl({ url: this.plugin.settings.apiUrl, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: 'Hello', source: 'auto', target: this.plugin.settings.targetLang }) }); if (response.status === 200) new Notice(`✅ ${t('connection_success')}`); else new Notice(`❌ ${t('connection_failed')}: HTTP ${response.status}`); } catch (err) { new Notice(`❌ ${t('connection_failed')}: ${err.message}`); } }));
        
        // 快捷键提示
        containerEl.createEl('h3', { text: '⌨️ ' + t('hotkey_tips') });
        const hotkeyTip = containerEl.createDiv();
        hotkeyTip.style.cssText = 'background: var(--background-secondary); padding: 12px; border-radius: 8px; margin: 8px 0;';
        hotkeyTip.innerHTML = `
            <p>💡 <strong>${t('tip_hotkey')}</strong></p>
            <p style="margin-top: 8px; font-size: 0.85em;">📌 ${t('tip_translate')}</p>
            <p style="margin-top: 4px; font-size: 0.85em;">📖 ${t('lookup')}</p>
            <p style="margin-top: 4px; font-size: 0.85em;">➕ ${t('add')}</p>
        `;
    }
}

module.exports = CustomTranslate;