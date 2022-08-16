Käyttötapauskuvaukset:

Nimi: Selailee äänestyksiä
Käyttäjät: User
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on seurannut www-linkkiä.
Jälkiehto: -
Käyttötapauksen kulku: Käyttäjä seuraa www-linkkiä, joka johtaa sovelluksen etusivulle. Mikäli käyttäjä haluaa osallistua äänestykseen tai katsoa äänestystilanteen, on hänen rekisteröidyttävä sekä kirjauduttava sivustolle. Muussa tapauksessa käyttäjä voi vain katsella mitä äänestyksiä on käynnissä.
Poikkeuksellinen toiminta: Sivua ei löydy.

Nimi: Valitsee äänestyksen
Käyttäjät: User
Laukaisija: Kun käyttäjä on klikannut ko. äänestystä.
Esiehto: Kun rekisteröinti on tehty.
Jälkiehto: Kun kirjautuminen on tehty.
Käyttötapauksen kulku: Käyttäjä kirjautuu sivustolle syöttämällä käyttäjätunnuksen sekä salasanan. Kirjautumisen jälkeen eteen aukeaa äänestykset, joita käyttäjä voi selata ja valita jonkin äänestyksistä, jota haluaa tarkastella tai äänestää. Klikkaamalla äänestystä käyttäjä suorittaa valinnan.
Poikkeuksellinen toiminta: Äänestystä ei löydy.

Nimi: Katsoo äänestystilanteen
Käyttäjät: User
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on rekisteröitynyt ja kirjautunut.
Jälkiehto: Käyttäjä on valinnut äänestyksen.
Käyttötapauksen kulku: Valittuaan äänestyksen klikkaamalla eteen avautuu ko. äänestyksen äänestystilanne.
Poikkeuksellinen toiminta: Äänestystä ei löydy.

Nimi: Äänestää valitsemassa äänestyksessä
Käyttäjät: User
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on rekisteröitynyt ja kirjautunut.
Jälkiehto: Käyttäjä on valinnut äänestyksen.
Käyttötapauksen kulku: Valittuaan äänestyksen käyttäjä voi tarkastella äänestystä sekä äänestää. Äänestys tapahtuu samalla sivulla äänestyspainikkeilla.
Poikkeuksellinen toiminta: Äänestys ei onnistu. 

Nimi: Rekisteröityminen
Käyttäjät: User 
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on seurannut www-linkkiä.
Jälkiehto: Käyttäjä on lisännyt tarvittavat tiedot lomakkeeseen. 
Käyttötapauksen kulku: Käyttäjä seuraa www-linkkiä sovelluksen etusivulle, jossa on linkki rekisteröitymislomakkeelle. Lomakkeelle käyttäjä lisää tarvittavat tiedot itsestään, sekä luo käyttäjätunnuksen ja salasanan.
Poikkeuksellinen toiminta: Rekisteröinti ei onnistu.

Nimi: Kirjautuminen
Käyttäjät: User, Admin.
Laukaisija: Käyttäjän toimesta. Etusivu avautuu kun kirjautuminen on onnistunut.
Esiehto: User on rekisteröitynyt. Admintili luotu.
Jälkiehto: Käyttäjätunnus ja salasana ovat oikeat.
Käyttötapauksen kulku: Käyttäjä seuraa www-linkkiä sovelluksen etusivulle, jossa on kirjautumiskentät. Käyttäjä kirjaa kentille käyttäjätunnuksen ja salasanan. Kirjautumisen jälkeen avautuu sivu jossa äänestyksiä voi valita ja tarkastella sekä äänestää. Admin tilin käyttäjälle aukeaa sovelluksen ylläpitosivu.
Poikkeuksellinen toiminta: Kirjautuminen ei onnistu.

Nimi: Selaa käyttäjiä
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta.
Esiehto: Admintili on luotu.
Jälkiehto: Käyttäjä on kirjautunut. 
Käyttötapauksen kulku: Käyttäjä kirjautuu ylläpitosivulle, jossa voi tarkastella käyttäjiä, sekä lisätä että poistaa niitä.
Poikkeuksellinen toiminta: Sivua ei löydy.

Nimi: Selaa äänestyksiä
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta. 
Esiehto: Admintili on luotu.
Jälkiehto: Käyttäjä on kirjautunut.
Käyttötapauksen kulku: Kirjauduttuaan käyttäjälle avautuu ylläpitosivu, jossa on mahdollista tarkastella äänestyksiä, sekä luoda että poistaa niitä. 
Poikkeuksellinen toiminta: Sivua ei löydy.

Nimi: Lisää käyttäjän
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä (admin) on kirjautunut.
Jälkiehto: Lisättävä käyttäjä ei ole vielä listallla.
Käyttötapauksen kulku: Käyttäjä (admin) on kirjautunut ylläpitosivustolle, jossa on mahdollista lisätä käyttäjä (user) mikäli tämä ei jostain syystä pysty itse rekisteröitymään. Lisäys tapahtuu erillisellä lomakkeella.
Poikkeuksellinen toiminta: Lisäys ei onnistu.

Nimi: Poistaa käyttäjän
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä (admin) on kirjautunut.
Jälkiehto: Lisättävä käyttäjä (user) on rekisteröitynyt.
Käyttötapauksen kulku: Käyttäjä (admin) on kirjautunut ylläpitosivulle, jossa on mahdolllista poistaa käyttäjä (user). Poistaminen tapahtuu valitsemalla käyttäjä ja deletoimalla se.
Poikkeuksellinen toiminta: Poistaminen ei onnistu.

Nimi: Luo uusia äänestyksiä
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on kirjautunut.
Jälkiehto: Äänestys on uusi.
Käyttötapauksen kulku: Käyttäjä (admin) on kirjautunut ylläpitosivulle, jossa on linkki äänestyksen luonti-lomakkeelle.
Poikkeuksellinen toiminta: Äänestyksen luonti ei onnistu.

Nimi: Poistaa äänestyksiä
Käyttäjät: Admin
Laukaisija: Käyttäjän toimesta.
Esiehto: Käyttäjä on kirjautunut.
Jälkiehto: Äänestys on luotu.
Käyttötapauksen kulku: Käyttäjä on kirjautunut ylläpitosivulle ja valitsee poistettavan äänestyksen ja poistaa sen. 
Poikkeuksellinen toiminta: Äänestyksen poistaminen ei onnistu.