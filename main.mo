import Array "mo:base/Array"; // Array modülünü import ettik

actor {
  // Öğrenci isimlerini saklamak için bir dizi tanımlıyoruz
  stable var names : [Text] = [];

  // Greet metodu, adları selamlar ve ekler
  public func greet(name: Text) : async Text {
    // Adı diziye ekleyelim
    names := Array.append<Text>(names, [name]); // Array.append() kullanıldı
    return "Merhaba, " # name # " Verini ekledim"; // Burada # kullanılıyor
  };

  // Dizideki tüm adları döndüren bir metot
  public query func getNames() : async [Text] {
    return names;
  };

  // Adı silen bir metod
  public func deleteName(name: Text) : async Text {
    // Verilen ismi diziden siliyoruz
    names := Array.filter<Text>(names, func(existingName) : Bool {
      return existingName != name;
    });
    return name # " başarıyla silindi.";
  };
};
