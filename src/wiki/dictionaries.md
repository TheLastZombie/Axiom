## Japanese Dictionaries

This is an extremely work-in-progress document trying to make sense of the extremely vast and confusing landscape of digital Japanese dictionaries, such as [JMdict](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project). Eventually, I'd like to expand this page to document all kinds of digital dictionary formats (not just Japanese ones), as well as related ones such as [frequency databases](https://web.archive.org/web/20190309073023/https://forum.koohii.com/thread-9459.html#pid168613).

### Sources

To get an overview of the available dictionaries, the following sources are currently being used:

- [Yomichan](https://foosoft.net/projects/yomichan/#dictionaries)
- [Yomichan Import](https://foosoft.net/projects/yomichan-import/)
- [10ten Japanese Reader](moz-extension://86321be0-05dc-4b88-a962-dba6f18e4187/options.html#kanji-reference-list)

## Dictionaries

Combining the dictionaries utilized by the above sources results in the following list:

- [JMdict/EDICT](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) (or simply JMdict), a Japanese ↔ Dutch, English, French, German, Hungarian, Russian, Slovenian, Spanish, Swedish vocabulary dictionary
   - [COMPDIC](https://www.edrdg.org/jmdict/compdic_doc.html), a dictionary containing computing and telecommunication terms, now deprecated as it was merged with JMdict in June 2008
- [ENAMDICT/JMnedict](https://www.edrdg.org/enamdict/enamdict_doc.html) (or simply JMnedict), a Japanese ↔ English name dictionary
- [KANJIDIC](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project), a Japanese ↔ English, French, Portuguese, Spanish kanji dictionary
- [RikaiCake](https://kireicake.com/rikaicake-online/), a Japanese ↔ English slang dictionary
- [Kanjium](https://github.com/mifunetoshiro/kanjium), a general Kanji resource with a lot of different data, including English translations
- [Rikaichan](https://www.polarcloud.com/getrcx/), a (now outdated) Firefox extension with Japanese ↔ Dutch, English, French, German, Hungarian, Russian vocabulary dictionaries, as well as a Japanese ↔ English name dictionary
- [EPWING](https://web.archive.org/web/20060901221844/http://www.epwing.or.jp:80/), a proprietary format used by a lot of Japanese dictionaries (often as supplements to analog ones), such as:
   - [Daijirin](http://daijirin.dual-d.net/)
   - [Daijisen](https://daijisen.jp/)
   - [Kenkyusha](https://www.kenkyusha.co.jp/modules/00_top/index.php?content_id=1)
   - [Kotowaza](https://www.web-nihongo.com/wn/dictionary/dic_21/d-index.html)
   - [Meikyou](https://www.taishukan.co.jp/book/b197673.html)
   - [Kojien](http://kojien.iwanami.co.jp/)
   - [Gakken](https://www.gakken.co.jp/)

### Links

To download most of the dictionaries above, one could, for example, use the following text file with [aria2](https://aria2.github.io/):

```Bash
# JMdict/EDICT
ftp://ftp.edrdg.org/pub/Nihongo/JMdict			http://ftp.edrdg.org/pub/Nihongo/JMdict
ftp://ftp.edrdg.org/pub/Nihongo/JMdict_e		http://ftp.edrdg.org/pub/Nihongo/JMdict_e
ftp://ftp.edrdg.org/pub/Nihongo/JMdict_e_examp	http://ftp.edrdg.org/pub/Nihongo/JMdict_e_examp
ftp://ftp.edrdg.org/pub/Nihongo/edict			http://ftp.edrdg.org/pub/Nihongo/edict
ftp://ftp.edrdg.org/pub/Nihongo/edict2			http://ftp.edrdg.org/pub/Nihongo/edict2

# ENAMDICT/JMnedict
ftp://ftp.edrdg.org/pub/Nihongo/enamdict		http://ftp.edrdg.org/pub/Nihongo/enamdict
ftp://ftp.edrdg.org/pub/Nihongo/JMnedict.xml	http://ftp.edrdg.org/pub/Nihongo/JMnedict.xml

# KANJIDIC
ftp://ftp.edrdg.org/pub/Nihongo/kanjidic2.xml	http://ftp.edrdg.org/pub/Nihongo/kanjidic2.xml
ftp://ftp.edrdg.org/pub/Nihongo/kanjidic		http://ftp.edrdg.org/pub/Nihongo/kanjidic
ftp://ftp.edrdg.org/pub/Nihongo/kanjd212		http://ftp.edrdg.org/pub/Nihongo/kanjd212

# Kanjium
https://github.com/mifunetoshiro/kanjium/raw/master/data/kanjidb.sqlite

# Rikaichan
https://www.polarcloud.com/down/mdo/rikaichan-nl-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-en-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-fr-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-de-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-hu-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-ru-2-01-211001.xpi
https://www.polarcloud.com/down/mdo/rikaichan-names-2-01-211001.xpi
```

This will just grab the "most important" files, i. e. the ones listed as download links on the respective pages. More files from the EDRDG are listed [here](http://ftp.edrdg.org/pub/Nihongo/#dic_fil).

### Formats

JMdict is available in three formats. More information can be found [here](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project#FORMAT), but in short:

- JMdict, an XML file with DTD schemas available [here](https://www.edrdg.org/jmdict/jmdict_dtd_h.html) and [here](https://www.edrdg.org/jmdict/dtd-jmdict.xml).
- EDICT and EDICT2, two versions of the same plain-text format documented [here](https://www.edrdg.org/jmdict/edict.html).

JMnedict uses a similar format to JMdict, with details available under the "Format" section [here](https://www.edrdg.org/enamdict/enamdict_doc.html).

The format used by KANJIDIC is documented on [its page](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project#Content_.26_Format) as well.

RikaiCake serves its entire database via two HTML tables [here](https://kireicake.com/rikaicake-online/), though [DataTables](https://www.datatables.net/) is used to make it more accessible. To download it, grabbing the source code of that page is recommended – there doesn't seem to be any other method at the moment.

[Yomichan](https://foosoft.net/projects/yomichan/#dictionaries) also provides downloads of a lot of the aforementioned dictionaries, preprocessed into a simple JSON format, though these may be out of date due to being unofficial.

Due to EPWING being a proprietary format, not much is known about it. However, its [Wikipedia page](https://wikiless.org/wiki/EPWING?lang=ja#%E4%BB%95%E6%A7%98) provides a few details about the various specifications (EPWING V1 through V6, as well as EPWING ST). It should be noted that EPWING dictionaries are not stored in a single file, but rather a directory tree.

### Acknowledgements

Huge thanks to everyone involved with the above dictionaries and sources, especially the [Electronic Dictionary Research and Development Group](https://www.edrdg.org/).
