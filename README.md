# Ancestry

Программы для запуска проекта:

- node.js ( [https://nodejs.org/en/](https://nodejs.org/en/) )
- yarn ( [https://yarnpkg.com/](https://yarnpkg.com/) )

Команды для запуска проекта

- yarn install - для установки зависимостей (обязательно перед использованием других команд)
- yarn start - для запуска в режиме разработчика
- yarn build - для сборки проекта (проект будет в папке build)

Файловая структура папки public

```
documents/ - документы (*.pdf) и обложки прикрепляемые (*.jpg) в yaml файле к людям в родословной
files/ - файл родословной в формате yaml
img/ - любые изображения пользователей(аватар, фотографии)
```

Для загрузки \*.yaml файла необходимо подставить правильный путь в функцию loadYaml в

./src/pages/main/index.tsx

```jsx
import React, { useContext, useEffect } from "react";
import Header from "../../components/Header";
import Ancestry from "../../components/Ancestry";
import Details from "../../components/Details";
import loadYaml from "../../helpers/loadYaml";
import { NodeContext } from "../../App";

**// Ссылка на yaml файл с содержанием родословной
const LINK = "./files/rurikovichi.yaml";**

const Main = () => {
  const { handleFamilyTree } = useContext(NodeContext);

  useEffect(() => {
    loadYaml(LINK, (json) => {
      handleFamilyTree(json);
    });
  }, []);

  return (
    <>
      <Header />
      <Ancestry />
      <Details />
    </>
  );
};

export default Main;
```

Описание заполнения файла для одного человека

```yaml
	# id - Уникальное значение в виде строки без пробелов
- id: "user1"
	# Пол: "male"(мужской) или "female"(женский)
  gender: "male"
	# Имя
  name: "Игорь"
	# Ссылка на фотографию
	# примеры:
	# - "./img/user1.png"
	# - "https://picsum.photos/200/300"
  img: "https://picsum.photos/200/300"
	# Дата рождения
  birthday: "877"
	# Место рождения
  placebirth: ""
	# Место смерти
  datebirth: "Искоростень, Киевская Русь"
	# Дата смерти
  deathday: "945"
	# Бывшие фамилии кроме последней
	# surnameBefore:
	#  - "Фамилия1"
	#  - "Фамилия2"
	#  - "Фамилия3"
  surnameBefore: ""
	# Последняя фамилия
  surname: "Рюрикович"
	# Фотографии
  photos:
			# Описание фотографии
    - description: "Игорь берёт дань от древлян"
			# Уникальное значение(id) людей на фотографии
      persons:
        - "user1"
        - "user2"
			# Ссылка на фотографию
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Radzivill_Igor-945.jpg"
			# Ссылка на обратную сторону фотографии
      backSideImg: "https://upload.wikimedia.org/wikipedia/commons/7/73/Radzivill_Igor-945.jpg"
			# Дата когда была сделана фотография
      date: "945"
			# Место где была сделана фотография
      place: "Искоростень"
    - description: "Убийство Игоря древлянами"
      persons:
        - "user1"
        - "user2"
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Korosten1.jpg/600px-Korosten1.jpg"
      backSideImg: ""
      date: "945"
      place: "Искоростень"
	# Список документов
  documents:
			# Расширение файла
    - type: "pdf"
			# Описание файла
      description: "Повесть временных лет"
			# Предпросмотровая картинка для файла
      image: "./documents/document1.png"
			# Ссылка на файл
			url: "./documents/povest_vremennyh_let.pdf"
	# Перечисление родителей
	# пример:
	# - id: "user1
	#   type: "blood"
	parents:
			# Уникальное значение(id) родителя
    - id: "user5"
			# type Один из типов связей с parents, siblings, spouses, children:
			# "blood" - по крови
			# "married" - в браке
			# "divorced" - в разводе
			# "adopted" - усыновленный(-ая)
			# "half"
      type: "blood"
    - id: "user6"
      type: "blood"
	# Перечисление братьев и сестёр
  siblings: []
	# Перечисление супругов
  spouses:
    - id: "user123"
      type: "married"
	# Перечисление детей
  children: []
```

Пример заполнения

```yaml
- id: "user1"
  gender: "male"
  name: "Игорь"
  img: "./img/user1.png"
  birthday: "877"
  deathday: "945"
  deathplace: "Искоростень, Киевская Русь"
  placebirth: "Новгород, Россия"
  surname: ""
  biography: "Игорь Рюрикович – великий князь Древней Руси, сын Рюрика, муж княгини Ольги, отец Святослава. Династия Рюриковичей правила государством свыше 700 лет. О событиях, в которых участвовал князь Игорь, сегодня известно только из ряда летописей, порой противоречащих друг другу."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses:
    - id: "user3"
      type: "married"
  children:
    - id: "user2"
      type: "blood"
  photos:
    - description: "Игорь берёт дань от древлян."
      persons:
        - user1
        - user2
        - user3
        - user4
      image: https://upload.wikimedia.org/wikipedia/commons/7/73/Radzivill_Igor-945.jpg
      backSideImg: https://picsum.photos/200/200
      date: 945
      place: "Искоростень"
    - description: Mars
      persons:
        - user6
        - user2
      image: https://picsum.photos/200/200
      backSideImg: https://picsum.photos/200/200
      date: 11.12.1975
      place: Moscow

- id: "user2"
  gender: "male"
  name: "Святослав"
  # img: "./img/user2.png"
  birthday: "920"
  deathday: ""
  placebirth: "Киев, Киевская Русь"
  surname: ""
  biography: "Князь новгородский и Великий князь Киевский с 945 (фактически с 964) по 972 год, прославился как полководец. Формально Святослав стал правителем в трёхлетнем возрасте после гибели в 945 году отца, киевского князя Игоря, но самостоятельное правление началось, как можно судить по косвенным данным, около 961 года (по летописи в 964 году). При Святославе Киевской Русью в значительной мере правила его мать — княгиня Ольга, сначала из-за малолетства Святослава, затем из-за его постоянного пребывания в военных походах. При возвращении из похода на Болгарию Святослав был убит печенегами в 972 году на днепровских порогах."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user1"
      type: "blood"
    - id: "user3"
      type: "blood"
  siblings: []
  spouses:
    - id: "user2_1"
      type: "married"
    - id: "user2_2"
      type: "married"
  children:
    - id: "user4"
      type: "blood"
    - id: "user5"
      type: "blood"

- id: "user2_1"
  gender: "female"
  name: "Малуша"
  # img: "./img/user2.png"
  birthday: "ок. 940—944"
  deathday: ""
  placebirth: ""
  surname: ""
  biography: "ключница-рабыня великой княгини Ольги, наложница её сына великого князя Святослава Игоревича, сестра Добрыни, ставшего воеводой, мать Владимира Святого."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user2_1_1"
      type: "blood"
    - id: "user2_1_2"
      type: "blood"
  siblings: []
  spouses:
    - id: "user2"
      type: "divorced"
  children:
    - id: "user5"
      type: "blood"

- id: "user2_1_1"
  gender: "female"
  name: "Мамелфа Тимофеевна"
  # img: "./img/user2.png"
  birthday: ""
  deathday: ""
  placebirth: ""
  surname: ""
  biography: "Добрая и мудрая женщина."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses:
    - id: "user2_1_2"
      type: "married"
  children:
    - id: "user2_1"
      type: "blood"
    - id: "user2_1_3"
      type: "blood"

- id: "user2_1_2"
  gender: "male"
  name: "Мал (Нискин)"
  # img: "./img/user2.png"
  birthday: ""
  deathday: ""
  placebirth: ""
  surname: ""
  biography: "Муж Мамелфы Тимофеевны"
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses:
    - id: "user2_1_1"
      type: "married"
  children:
    - id: "user2_1"
      type: "blood"
    - id: "user2_1_3"
      type: "blood"

- id: "user2_1_3"
  gender: "male"
  name: "Добрыня Никитич"
  # img: "./img/user2.png"
  birthday: ""
  deathday: "1007"
  placebirth: ""
  surname: ""
  biography: "воевода Владимира Святославича, брат матери его Малуши, по некоторым указаниям, сын Малка Любечанина. Считается возможным прототипом богатыря Добрыни Никитича."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user2_1_1"
      type: "blood"
    - id: "user2_1_2"
      type: "blood"
  siblings:
    - id: "user2_1"
      type: "blood"
  spouses: []
  children: []

- id: "user2_2"
  gender: "female"
  name: "Предслава"
  # img: "./img/user2.png"
  birthday: ""
  deathday: ""
  placebirth: ""
  surname: ""
  biography: "Предслава — жена князя Святослава Игоревича. Мать Ярополка Святославича и Олега Святославича Стараясь удержать сына при себе, княгиня Ольга его рано женила. По одним данным, в супруги Святославу она выбрала дочь знатного киевского боярина, имя которой история не сохранила. Историк В.Н. Татищев называет женой киевского князя угорскую княжну Предславу. Вскоре у Святослава родились сыновья Ярополк и Олег. Однако никаких родительских чувств юный князь к ним не испытывал. Ольга забрала внуков к себе в Вышгород, где они подрастали под ее присмотром. Брачные узы вообще ничего не значили для великого князя, привыкшего получать силой все, что ему хотелось. Впоследствии из воинских походов он привозил жен-полонянок. В его гареме их было несколько десятков."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses:
    - id: "user2"
      type: "married"
  children:
    - id: "user4"
      type: "blood"
    - id: "user4_1"
      type: "blood"

- id: "user3"
  gender: "female"
  name: "Ольга"
  img: "./img/user3.png"
  birthday: "893"
  placebirth: "Псков"
  datebirth: "Киев, Киевская Русь"
  deathday: "969"
  biography: "Княгиня, правившая Киевской Русью с 945 до 960 года в качестве регента при малолетнем сыне Святославе, после гибели её мужа, киевского князя Игоря Рюриковича. Первая из правителей Руси, которая приняла христианство, святая равноапостольная Русской православной церкви; её память празднуется 11 (24) июля и в Соборах Киевских, Псковских и Волынских святых."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses:
    - id: "user1"
      type: "married"
  children:
    - id: "user2"
      type: "blood"

- id: "user4"
  gender: "male"
  name: "Ярополк"
  img: "./img/user4.png"
  birthday: "955"
  placebirth: "Киев, Киевская Русь"
  datebirth: "Киев, Киевская Русь"
  deathday: "978"
  biography: "Великий князь киевский (972—978 годы), старший сын князя Святослава Игоревича. Погиб в первой междоусобице в роду Рюриковичей."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user2"
      type: "blood"
    - id: "user2_2"
      type: "blood"
  siblings:
    - id: "user4_1"
      type: "blood"
  spouses: []
  children: []

- id: "user4_1"
  gender: "male"
  name: "Олег Святославич"
  # img: "./img/user2.png"
  birthday: ""
  deathday: "977"
  placebirth: ""
  surname: ""
  biography: "Князь древлян, сын Святослава Игоревича. Погиб в войне против своего старшего брата Ярополка Святославича. Некоторые историки считают его первым Рюриковичем, ставшим жертвой династической междоусобицы."
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user2"
      type: "blood"
    - id: "user2_2"
      type: "blood"
  siblings:
    - id: "user4"
      type: "blood"
  spouses: []
  children: []

- id: "user5"
  gender: "male"
  name: "Владимир"
  img: "./img/user5.png"
  birthday: "956"
  placebirth: ""
  datebirth: "Берестово, Киев, Киевская Русь"
  deathday: "1015"
  biography: "Князь новгородский (969—978), великий князь киевский (978—1015), при котором произошло Крещение Руси. Стал новгородским князем в 970 году, захватил киевский престол в 978 году. В 988 году принял христианство по греческому обряду, а также сделал его государственной религией Киевской Руси. В крещении получил христианское имя Василий. Известен под именами Владимир I, Владимир Святой, Владимир Великий, Красно Солнышко, Владимир Креститель (в церковной истории)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user2"
      type: "blood"
    - id: "user2_1"
      type: "blood"
  siblings: []
  spouses:
    - id: "user11"
      type: "married"
  children:
    - id: "user6"
      type: "blood"
    - id: "user7"
      type: "blood"

- id: "user11"
  gender: "female"
  name: "Владимира"
  # img: "./img/user5.png"
  birthday: "956"
  placebirth: ""
  datebirth: "Берестово, Киев, Киевская Русь"
  deathday: "1015"
  biography: "Князь новгородский (969—978), великий князь киевский (978—1015), при котором произошло Крещение Руси. Стал новгородским князем в 970 году, захватил киевский престол в 978 году. В 988 году принял христианство по греческому обряду, а также сделал его государственной религией Киевской Руси. В крещении получил христианское имя Василий. Известен под именами Владимир I, Владимир Святой, Владимир Великий, Красно Солнышко, Владимир Креститель (в церковной истории)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user12"
      type: "blood"
  siblings: []
  spouses:
    - id: "user5"
      type: "married"
  children:
    - id: "user6"
      type: "blood"
    - id: "user7"
      type: "blood"

- id: "user12"
  gender: "female"
  name: "Влад"
  # img: "./img/user5.png"
  birthday: "956"
  placebirth: ""
  datebirth: "Берестово, Киев, Киевская Русь"
  deathday: "1015"
  biography: "Князь новгородский (969—978), великий князь киевский (978—1015), при котором произошло Крещение Руси. Стал новгородским князем в 970 году, захватил киевский престол в 978 году. В 988 году принял христианство по греческому обряду, а также сделал его государственной религией Киевской Руси. В крещении получил христианское имя Василий. Известен под именами Владимир I, Владимир Святой, Владимир Великий, Красно Солнышко, Владимир Креститель (в церковной истории)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents: []
  siblings: []
  spouses: []
  children:
    - id: "user11"
      type: "blood"

- id: "user6"
  gender: "male"
  name: "Святополк"
  img: "./img/user6.png"
  birthday: "979"
  placebirth: ""
  datebirth: "Берестово, Киев, Киевская Русь"
  deathday: "1019"
  biography: "Князь туровский (с 988, первый из рода Рюриковичей), великий князь киевский в 1015—1016 и 1018—1019. Сын или племянник-пасынок Владимира Святославича, пришёл к власти после его смерти. По преданию, приказал умертвить своих братьев Бориса и Глеба, а потом ещё одного брата Святослава, за что в истории получил прозвище «Окаянный». Боролся со своим братом Ярославом за власть с помощью польского князя Болеслава, на дочери которого был женат. Потерпел поражение и бежал на Запад, где и умер."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user5"
      type: "blood"
    - id: "user11"
      type: "blood"
  siblings: []
  spouses: []
  children: []

- id: "user7"
  gender: "male"
  name: "Ярослав"
  img: "./img/user7.png"
  birthday: "978"
  placebirth: ""
  datebirth: "Вышгород, Киевская Русь"
  deathday: "1054"
  biography: "Сын князя Владимира Святославича (из рода Рюриковичей) и полоцкой княжны Рогнеды Рогволодовны, отец, дед и дядя многих правителей Европы. При крещении был наречён Георгием. В Русской православной церкви и Православной церкви Украины почитается как благоверный князь; день памяти — 20 февраля (4 марта) в високосный год или 20 февраля (5 марта) в невисокосные годы. При Ярославе Владимировиче на Руси начали строить храмы, стали развиваться культура и образованность, выросла численность населения, Киев стал богатейшим городом, был составлен первый известный свод законов русского права, который вошёл в историю как «Русская правда». Ярослав Мудрый построил дружеские отношения со Швецией, а также наладил отношения с Византией, Священной Римской империей и другими странами Европы. Ярославу удалось победоносно завершить русско-печенежские войны и вернуть захваченные Польшей Червенские города в состав Киевской Руси."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user5"
      type: "blood"
    - id: "user11"
      type: "blood"
  siblings: []
  spouses: []
  children:
    - id: "user8"
      type: "blood"
    - id: "user9"
      type: "blood"

- id: "user8"
  gender: "male"
  name: "Ярослав"
  img: "./img/user8.png"
  birthday: "1030"
  placebirth: "Киев, Киевская Русь"
  datebirth: "Вышгород, Киевская Русь"
  deathday: "1093"
  biography: "Князь киевский в 1076—1077 и с 1078 до конца жизни, первый правитель Киева, использовавший титул «князь всея Руси» (отразившийся на его печатях)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user7"
      type: "blood"
  siblings: []
  spouses: []
  children: []

- id: "user9"
  gender: "male"
  name: "Изяслав"
  img: "./img/user9.png"
  birthday: "1024"
  placebirth: "Великий Новгород"
  datebirth: "Вышгород, Киевская Русь"
  deathday: "1078"
  biography: "Князь туровский (до 1054), новгородский князь (1052—1054), великий князь киевский (1054—1068, 1069—1073 и 1077—1078)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user7"
      type: "blood"
  siblings: []
  spouses: []
  children:
    - id: "user10"
      type: "blood"

- id: "user10"
  gender: "male"
  name: "Изяслав 2"
  img: "./img/user9.png"
  birthday: "1024"
  placebirth: "Великий Новгород"
  datebirth: "Вышгород, Киевская Русь"
  deathday: "1078"
  biography: "Князь туровский (до 1054), новгородский князь (1052—1054), великий князь киевский (1054—1068, 1069—1073 и 1077—1078)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user9"
      type: "blood"
  siblings: []
  spouses: []
  children:
    - id: "user15"
      type: "blood"

- id: "user15"
  gender: "male"
  name: "Изяслав 2"
  img: "./img/user9.png"
  birthday: "1024"
  placebirth: "Великий Новгород"
  datebirth: "Вышгород, Киевская Русь"
  deathday: "1078"
  biography: "Князь туровский (до 1054), новгородский князь (1052—1054), великий князь киевский (1054—1068, 1069—1073 и 1077—1078)."
  surname: ""
  documents:
    - type: "pdf"
      description: "Повесть временных лет"
      image: "./documents/document1.png"
      url: "./documents/povest_vremennyh_let.pdf"
  parents:
    - id: "user10"
      type: "blood"
  siblings: []
  spouses: []
  children: []
```
