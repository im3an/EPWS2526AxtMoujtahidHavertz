package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.MissingReport
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface MissingReportRepository: CrudRepository<MissingReport, UUID> {

    fun findByPetName(petName: String): MissingReport?
    fun findByOwnerId(ownerId: UUID): List<MissingReport>
    fun findByIsPublic(public: Boolean): List<MissingReport>

    @Query(value = """
        SELECT 
            r.id AS id, 
            r.pet_name AS petName, 
            r.species AS species, 
            (SELECT image_data FROM missing_report_images mri WHERE mri.missing_report_id = r.id LIMIT 1) AS previewImage,
            (6371 * acos(
                cos(radians(:userLat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:userLong)) + 
                sin(radians(:userLat)) * sin(radians(r.latitude))
            )) AS distance
        FROM missing_report r
        WHERE r.is_public = true 
        AND (6371 * acos(
            cos(radians(:userLat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:userLong)) + 
            sin(radians(:userLat)) * sin(radians(r.latitude))
        )) <= :radius
        ORDER BY distance ASC
    """,
        countQuery = "SELECT count(*) FROM missing_report WHERE is_public = true",
        nativeQuery = true)
    fun findNearbyReports(
        @Param("userLat") userLat: Double,
        @Param("userLong") userLong: Double,
        @Param("radius") radius: Double,
        pageable: Pageable
    ): Page<MissingReportPreview>
}

interface MissingReportPreview {
    fun getId(): UUID
    fun getPetName(): String
    fun getSpecies(): String
    fun getPreviewImage(): String?
    fun getDistance(): Double
}
