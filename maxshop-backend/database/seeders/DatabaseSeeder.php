<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        */

        DB::table('shops')->insert([
            [
                'id' => 1,
                'name' => 'Филиал #1',
                'address' => '355037 г. Ставрополь, ул. Доваторцев, 9',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Филиал #2',
                'address' => '355011 г. Ставрополь, ул. 50 лет ВЛКСМ, 93',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Филиал #3',
                'address' => '355041 г. Ставрополь, ул. Лермонтова, 219',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
            

        DB::table('categories')->insert([
            [
                'id' => 1,
                'name' => 'Спортивный инвентарь',
                'slug' => 'sport',
                'image' => 'sport_inventory.jpg',
                'description' => 'Если вам нужно похудеть к лету',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Спортивная одежда',
                'slug' => 'wear',
                'image' => 'sport_wear.jpg',
                'description' => 'Простенько и со стилем',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Водный спорт',
                'slug' => 'water',
                'image' => 'water_inventory.jpg',
                'description' => 'Для любителей воды',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('products')->insert([
            [
                'id' => 1,
                'name' => 'ОЧКИ ДЛЯ ПЛАВАНИЯ SR «E36864»',
                'slug' => 'gogles1',
                'image' => 'gogles1.jpg',
                'price' => 590,
                
                'description' => 'Силикон, цвет: голубой',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'ОЧКИ ДЛЯ ПЛАВАНИЯ JR «B31524»',
                'slug' => 'gogles2',
                'image' => 'gogles2.jpg',
                'price' => 680,
                'description' => 'Цвет: мультиколор',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'ШАПОЧКА ДЛЯ ПЛАВАНИЯ SR «QILANG»',
                'slug' => 'hat1',
                'image' => 'hat1.jpg',
                'price' => 380,
                'description' => 'Силикон, цвет: черный',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'ШАПОЧКА ДЛЯ ПЛАВАНИЯ JR «C33692»',
                'slug' => 'hat2',
                'image' => 'hat2.jpg',
                'price' => 230,
                'description' => 'Лайкра, цвет: синий',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'ЛАСТЫ ДЛЯ БАССЕЙНА «TE-2737-2»',
                'slug' => 'legs',
                'image' => 'legs.jpg',
                'price' => 2240,
                
                'description' => 'Силикон, двухцветные, размер: 33-35',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'name' => 'АКВАПОЯС «AQUAFITNESS» МАЛЕНЬКИЙ',
                'slug' => 'soft1',
                'image' => 'soft1.jpg',
                'price' => 990,
                
                'description' => '4 секции',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'name' => 'АКВАПОЯС «AQUAFITNESS» БОЛЬШОЙ',
                'slug' => 'soft2',
                'image' => 'soft2.jpg',
                'price' => 1390,
                
                'description' => '5 секций',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'name' => 'АНТИФОГ-СПРЕЙ «AS02»',
                'slug' => 'spray',
                'image' => 'spray.jpg',
                'price' => 450,
                
                'description' => '30 МЛ.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'name' => 'БЕГОВАЯ ДОРОЖКА «ST-510T»',
                'slug' => 'run',
                'image' => 'run.jpg',
                'price' => 42250,
                
                'description' => 'ЭЛЕКТРИЧЕСКАЯ, 1,4 Л.С, СК: 0,8 - 10,0 КМ/Ч, Р: 40X110СМ, MAX: 110',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'name' => 'ВЕЛОТРЕНАЖЕР МАГНИТНЫЙ «U308»',
                'slug' => 'bike',
                'image' => 'bike.jpg',
                'price' => 28990,
                
                'description' => 'МАХОВИК - 6,0 КГ, MAX: 130 КГ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'name' => 'МЯЧ БАСКЕТБОЛЬНЫЙ «STREETS ALL STAR»',
                'slug' => 'basketball1',
                'image' => 'basketball1.jpg',
                'price' => 1850,
                
                'description' => 'РЕЗИНА, ЦВ: КРАСНО-СИНИЙ, РАЗМЕР: 7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'name' => 'МЯЧ БАСКЕТБОЛЬНЫЙ «ROCKET»',
                'slug' => 'basketball2',
                'image' => 'basketball2.jpg',
                'price' => 230,
                
                'description' => 'РЕЗИНА, ЦВ: СИНИЙ, РАЗМЕР: 7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'name' => 'МЯЧ ВОЛЕЙБОЛЬНЫЙ «RESIST»',
                'slug' => 'volleyball1',
                'image' => 'volleyball1.jpg',
                'price' => 1790,
                
                'description' => 'ПУ, ГИБРИДНАЯ СШИВКА, ЦВ: ЖЕЛТО-КРАСНО-ЧЕРНЫЙ, РАЗМЕР: 5',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'name' => 'МЯЧ ВОЛЕЙБОЛЬНЫЙ «ROCKET»',
                'slug' => 'volleyball2',
                'image' => 'volleyball2.jpg',
                'price' => 790,
                
                'description' => 'PU, КЛЕЕНЫЙ, ЦВ: МИКС, РАЗМЕР: 5',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'name' => 'ГАНТЕЛЬ РАЗБОРНАЯ ПЛАСТИКОВАЯ «DB-700»',
                'slug' => 'heavy1',
                'image' => 'heavy1.jpg',
                'price' => 3610,
                
                'description' => 'ВЕС: 15КГ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'name' => 'ДИСК В ПЛАСТИКОВОМ КОРПУСЕ «IN123»',
                'slug' => 'heavy2',
                'image' => 'heavy2.jpg',
                'price' => 180,
                
                'description' => 'D=26ММ, ВЕС: 0,5КГ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 17,
                'name' => 'ТЕРМОНОСКИ МУЖСКИЕ «PNT-003»',
                'slug' => 'sock1',
                'image' => 'sock1.jpg',
                'price' => 450,
                
                'description' => 'ЦВ: ЧЕРНЫЙ, РАЗМЕР: 27',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 18,
                'name' => 'НОСКИ МУЖСКИЕ УКОРОЧЕННЫЕ «ACTIVE»',
                'slug' => 'sock2',
                'image' => 'sock2.jpg',
                'price' => 150,
                
                'description' => 'ЦВ: ЧЕРНЫЙ, РАЗМЕР: 27',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 19,
                'name' => 'ШОРТЫ ДЕТСКИЕ',
                'slug' => 'shorts',
                'image' => 'shorts.jpg',
                'price' => 380,
                
                'description' => 'ХЛОПОК, РАЗМЕР: 26, ЦВ: ЧЕРНЫЙ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 20,
                'name' => 'ПЕРЧАТКИ ДЛЯ СПОРТА',
                'slug' => 'gloves',
                'image' => 'gloves.jpg',
                'price' => 350,
                
                'description' => 'ДВОЙНЫЕ, ШЕРСТЬ, ЦВ: ЧЕРНЫЙ, РАЗМЕР: 20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 21,
                'name' => 'ШНУРКИ ДЛЯ ОБУВИ',
                'slug' => 'strings',
                'image' => 'strings.jpg',
                'price' => 180,
                
                'description' => 'КРУГЛЫЕ, 6 ПАР, ДЛ: 100СМ, ЦВ: БЕЛЫЙ, ЧЕРНЫЙ, КОРИЧНЕВЫЙ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 22,
                'name' => 'ШАПКА «G85892»',
                'slug' => 'hat',
                'image' => 'hat.jpg',
                'price' => 1490,
                
                'description' => 'ЦВ: ОРАНЖ-ЧЕРНЫЙ, РАЗМЕР: OSFM',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 23,
                'name' => 'СПОРТИВНЫЙ КОСТЮМ, ДЕТСКИЙ «18140-TK»',
                'slug' => 'full_body',
                'image' => 'full_body.jpg',
                'price' => 1990,
                
                'description' => 'ЦВ: СЕРЫЙ, РАЗМЕР: 164 СМ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 24,
                'name' => 'БЕЙСБОЛКА «M409-500»',
                'slug' => 'cap',
                'image' => 'cap.jpg',
                'price' => 550,
                
                'description' => 'ХЛОПОК, ЦВ: ЧЕРНЫЙ, РАЗМЕР: УНИВЕРСАЛЬНЫЙ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('category_product')->insert([
            [
                'category_id' => 3,
                'product_id' => 1,
            ],
            [
                'category_id' => 3,
                'product_id' => 2,
            ],
            [
                'category_id' => 3,
                'product_id' => 3,
            ],
            [
                'category_id' => 3,
                'product_id' => 4,
            ],
            [
                'category_id' => 3,
                'product_id' => 5,
            ],
            [
                'category_id' => 3,
                'product_id' => 6,
            ],
            [
                'category_id' => 3,
                'product_id' => 7,
            ],
            [
                'category_id' => 3,
                'product_id' => 8,
            ],
            [
                'category_id' => 1,
                'product_id' => 9,
            ],
            [
                'category_id' => 1,
                'product_id' => 10,
            ],
            [
                'category_id' => 1,
                'product_id' => 11,
            ],
            [
                'category_id' => 1,
                'product_id' => 12,
            ],
            [
                'category_id' => 1,
                'product_id' => 13,
            ],
            [
                'category_id' => 1,
                'product_id' => 14,
            ],
            [
                'category_id' => 1,
                'product_id' => 15,
            ],
            [
                'category_id' => 1,
                'product_id' => 16,
            ],
            [
                'category_id' => 2,
                'product_id' => 17,
            ],
            [
                'category_id' => 2,
                'product_id' => 18,
            ],
            [
                'category_id' => 2,
                'product_id' => 19,
            ],
            [
                'category_id' => 2,
                'product_id' => 20,
            ],
            [
                'category_id' => 2,
                'product_id' => 21,
            ],
            [
                'category_id' => 2,
                'product_id' => 22,
            ],
            [
                'category_id' => 2,
                'product_id' => 23,
            ],
            [
                'category_id' => 2,
                'product_id' => 24,
            ],
        ]);

    }
}