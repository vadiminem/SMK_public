using SMK.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Product
    {
        // ID
        [Key]
        public int Id { get; set; }
        // Название
        public string Title { get; set; }
        // Описание
        public string Description { get; set; }
        // Фотографии
        public string ImagesPath { get; set; }
        // Цена
        public double Price { get; set; }
        //Категория
        public string Category { get; set; }
    }
}
